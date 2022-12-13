const express = require("express");
const router = express.Router();
const { customer_bank_details, customers } = require("../../models");
const url = "customer-bank-details";
const redisClient = require("../redisConnect");
// create
router.post(`/create-${url}`, async (req, res) => {
  await customer_bank_details
    .create(req.body)
    .then((data) => {
      res.status(200).send(data);
      redisClient.del("customer");
    })
    .catch((err) => res.status(500).send(err));
});
router.get(`/get-${url}`, async (req, res) => {
  try {
    const result = await redisClient.get(url);
    if (result !== null) {
      console.log(`caching ${url}`);
      res.status(200).send(JSON.parse(result));
    } else {
      console.log(`fetching ${url}`);
      await customer_bank_details.findAll().then((data) => {
        res.status(200).send(data);
        redisClient.set(url, JSON.stringify(data), { EX: 1800 });
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
// update
router.put(`/update-${url}/:id`, async (req, res) => {
  await customer_bank_details
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
// delete
router.delete(`/delete-${url}/:id`, async (req, res) => {
  await customer_bank_details
    .destroy({
      where: {
        bank_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(204).send("deleted");
      redisClient.del("customer");
    })
    .catch((err) => res.status(500).send(err));
});
customers.hasOne(customer_bank_details, {
  foreignKey: "customer_id",
});
customer_bank_details.belongsTo(customers, {
  foreignKey: "customer_id",
});
module.exports = router;
