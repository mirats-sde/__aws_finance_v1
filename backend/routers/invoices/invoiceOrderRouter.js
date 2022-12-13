const express = require("express");
const router = express.Router();
const redis = require("redis");
const { order, invoices } = require("../../models");
const url = "order";

const redisClient = require("../redisConnect");

// get all
router.get(`/get-${url}`, async (req, res) => {
  try {
    const result = await redisClient.get("invoice-orders");
    if (result !== null) {
      console.log("caching Invoice order");
      res.status(200).json(JSON.parse(result));
    } else {
      await order.findAll().then((data) => {
        res.status(200).send(data);
        redisClient.set("invoice-orders", JSON.stringify(data), { EX: 1800 });
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
// create
router.post(`/create-${url}`, async (req, res) => {
  try {
    await order.create(req.body).then((data) => {
      res.status(200).send(data);
      console.log("deleting cached Invoice-orders");
      redisClient.del("invoice-orders");
      redisClient.del("invoices");
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// update invoice order
router.put(`/update-${url}/:id`, async (req, res) => {
  try {
    await order
      .update(req.body, {
        where: {
          order_id: req.params.id,
        },
      })
      .then((data) => {
        res.status(200).send(data);
        redisClient.del("invoices");
      });
  } catch (err) {
    res.status(500).send(err);
  }
});
router.delete(`/delete-${url}/:id`, async (req, res) => {
  try {
    await order
      .destroy({
        where: {
          order_id: req.params.id,
        },
      })
      .then((data) => {
        res.status(204).send("deleted");
        redisClient.del("invoices");
      });
  } catch (error) {
    res.status(500).send(err);
  }
});
invoices.hasMany(order, {
  foreignKey: "invoice_id",
});
order.belongsTo(invoices, {
  foreignKey: "invoice_id",
});
module.exports = router;
