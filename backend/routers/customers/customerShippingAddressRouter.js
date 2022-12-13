const express = require("express");
const router = express.Router();

const { shipping_address, customers } = require("../../models");
// const router = require("./customersRouter");
const url = "shipping_address";
const redisClient = require("../redisConnect");
// create
router.post(`/create-${url}`, async (req, res) => {
  await shipping_address
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
      await shipping_address.findAll().then((data) => {
        res.status(200).send(data);
        redisClient.set(url, JSON.stringify(data), { EX: 1800 });
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
router.put(`/update-${url}/:id`, async (req, res) => {
  await shipping_address
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
// delete customers
router.delete(`/delete-${url}/:id`, async (req, res) => {
  await shipping_address
    .destroy({
      where: {
        shipping_address_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(204).send("deleted");
      redisClient.del("customer");
    })
    .catch((err) => res.status(500).send(err));
});
customers.hasOne(shipping_address, {
  foreignKey: "customer_id",
});
shipping_address.belongsTo(customers, {
  foreignKey: "customer_id",
});
module.exports = router;
