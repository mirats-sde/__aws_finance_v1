const express = require("express");
const { tax_information, customers } = require("../../models");
const router = express.Router();
const url = "tax-information";
const redisClient = require("../redisConnect");
// create tax-information
router.post(`/create-${url}`, async (req, res) => {
  await tax_information
    .create(req.body)
    .then((data) => {
      res.status(201).send(data);
      redisClient.del("customer");
    })
    .catch((err) => res.status(500).send(err));
});
// get tax-information
router.get(`/get-${url}`, async (req, res) => {
  try {
    const result = await redisClient.get(url);
    if (result !== null) {
      console.log(`caching ${url}`);
      res.status(200).send(JSON.parse(result));
    } else {
      console.log(`fetching ${url}`);
      tax_information.findAll().then((data) => {
        res.status(200).send(data);
        redisClient.set(url, JSON.stringify(data), { EX: 1800 });
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
// update tax_information
router.put(`/update-${url}/:id`, async (req, res) => {
  await tax_information
    .update(req.body, {
      where: {
        customer_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(200).send(data);
      redisClient.del("customer");
    })
    .catch((err) => res.status(500).send(err));
});
// delete tax_information
router.delete(`/delete-${url}/:id`, async (req, res) => {
  await tax_information
    .destroy({
      where: {
        tax_information_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(204).send("deleted");
      redisClient.del("customer");
    })
    .catch((err) => res.status(500).send(err));
});
customers.hasOne(tax_information, {
  foreignKey: "customer_id",
});
tax_information.belongsTo(customers, {
  foreignKey: "customer_id",
});
module.exports = router;
