const express = require("express");
const router = express.Router();

// const { Json } = require("sequelize/types/utils");
const { invoices, order } = require("../../models");
const url = "invoice";

const redisClient = require("../redisConnect");

// get all
router.get(`/get-${url}`, async (req, res) => {
  try {
    const result = await redisClient.get("invoices");
    if (result) {
      console.log("caching Invoices");
      res.status(200).json(JSON.parse(result));
    } else {
      console.log("fetching invoices");
      invoices.findAll({ include: order }).then((invoices) => {
        redisClient.set("invoices", JSON.stringify(invoices), { EX: 1800 });
        res.status(200).send(invoices);
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
// create
router.post(`/create-${url}`, async (req, res) => {
  try {
    await invoices.create(req.body).then((data) => {
      res.status(200).send(data);
      console.log("deleting cached Invoices");
      redisClient.del("invoices");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
//find multiple invoice of same customer
router.get(`/get-multiple-invoice/:id`, async (req, res) => {
  const oneInvoice = await redisClient.get("invoices");
  if (oneInvoice !== null) {
    console.log("caching multiple invoice");
    let result = JSON.parse(oneInvoice)?.filter(
      (one) => one?.customer_id == req.params.id
    );
    return res.status(200).send(result);
  } else {
    console.log("fetching multiple invoice");
    try {
      await invoices
        .findAll({
          where: { customer_id: req.params.id },
          include: [order],
        })
        .then((data) => res.status(200).send(data));
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
});
//find one
router.get(`/get-${url}/:id`, async (req, res) => {
  const oneInvoice = await redisClient.get("invoices");
  if (oneInvoice !== null) {
    console.log("caching one invoice");
    let result = JSON.parse(oneInvoice)?.filter(
      (one) => one?.invoice_id == req.params.id
    );
    return res.status(200).send(...result);
  } else {
    console.log("fetching one invoice");
    try {
      invoices
        .findOne({
          where: { invoice_id: req.params.id },
          include: [order],
        })
        .then((data) => res.status(200).send(data));
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
});
// update Invoice
router.put(`/update-${url}/:id`, async (req, res) => {
  try {
    await invoices
      .update(req.body, {
        where: {
          invoice_id: req.params.id,
        },
      })
      .then((data) => {
        console.log(data);
        res.status(200).json(data);
        redisClient.del("invoices");
      });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
// delete
router.delete(`/delete-${url}/:id`, async (req, res) => {
  try {
    await invoices
      .destroy({
        where: {
          invoice_number: req.params.id,
        },
      })
      .then((data) => {
        res.status(204).send("deleted");
        redisClient.del("invoices");
      });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
module.exports = router;
