const express = require("express");
const {
  customers,
  billing_address,
  shipping_address,
  tax_information,
  customer_bank_details,
  contact,
} = require("../../models");
const router = express.Router();
const url = "customer";
const redisClient = require("../redisConnect");
// create customer
router.post(`/create-${url}`, async (req, res) => {
  await customers
    .create(req.body)
    .then((data) => {
      res.status(201).send(data);
      redisClient.del(url);
    })
    .catch((err) => res.status(500).send(err));
});
// get customer
router.get(`/get-${url}`, async (req, res) => {
  try {
    const result = await redisClient.get(url);
    if (result !== null) {
      console.log(`caching ${url}`);
      res.status(200).send(JSON.parse(result));
    } else {
      console.log(`fetching ${url}`);
      customers
        .findAll({
          include: [
            billing_address,
            shipping_address,
            tax_information,
            customer_bank_details,
            contact,
          ],
        })
        .then((data) => {
          res.status(200).send(data);
          redisClient.set(url, JSON.stringify(data), { EX: 1800 });
        });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
// find one
router.get(`/get-${url}/:id`, async (req, res) => {
  const oneCustomer = await redisClient.get(url);
  if (oneCustomer !== null) {
    console.log("caching one " + url);
    let result = JSON.parse(oneCustomer)?.filter(
      (one) => one?.customer_id == req.params.id
    );
    return res.status(200).send(...result);
  } else {
    console.log("fetching one " + url);
    customers
      .findOne({
        where: { customer_id: req.params.id },
        include: [
          billing_address,
          shipping_address,
          tax_information,
          customer_bank_details,
          { model: contact },
        ],
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => res.status(500).send(err));
  }
});
// update customers
router.put(`/update-${url}/:id`, async (req, res) => {
  await customers
    .update(req.body, {
      where: {
        customer_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(200).send(data);
      redisClient.del(url);
    })
    .catch((err) => res.status(500).send(err));
});
// delete customers
router.delete(`/delete-${url}/:id`, async (req, res) => {
  await customers
    .destroy({
      where: {
        customer_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(204).send("deleted");
      redisClient.del(url);
    })
    .catch((err) => res.status(500).send(err));
});
module.exports = router;
