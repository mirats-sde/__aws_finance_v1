const express = require("express");
const { vendor_invoice } = require("../../models");
const router = express.Router();
const url = "vendor-invoice";
const redisClient = require("../redisConnect");
// create vendor_invoice
router.post(`/create-${url}`, async (req, res) => {
  await vendor_invoice
    .create(req.body)
    .then((data) => {
      res.status(201).send(data);
      redisClient.del(url);
    })
    .catch((err) => res.status(500).send(err));
});
// find one
router.get(`/get-${url}/:id`, async (req, res) => {
  const oneVendorInvoice = await redisClient.get(url);
  if (oneVendorInvoice !== null) {
    console.log("caching one Vendor invoice");
    let result = JSON.parse(oneVendorInvoice)?.filter(
      (one) => one?.vendor_invoice_id == req.params.id
    );
    return res.status(200).send(...result);
  } else {
    console.log("fetching one Vendor Invoice");
    try {
      vendor_invoice
        .findOne({
          where: { vendor_invoice_id: req.params.id },
        })
        .then((data) => res.status(200).send(data));
    } catch (err) {
      res.status(500).send(err);
    }
  }
});
// get vendor_invoice
router.get(`/get-${url}`, async (req, res) => {
  try {
    const result = await redisClient.get(url);
    if (result !== null) {
      console.log(`caching ${url}`);
      res.status(200).send(JSON.parse(result));
    } else {
      console.log(`fetching ${url}`);
      vendor_invoice.findAll({}).then((data) => {
        res.status(200).send(data);
        redisClient.set(url, JSON.stringify(data), { EX: 1800 });
      });
    }
  } catch (error) {
    res.status(500).send(err);
  }
});
// update vendor_invoice
router.put(`/update-${url}/:id`, async (req, res) => {
  await vendor_invoice
    .update(req.body, {
      where: {
        vendor_invoice_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(200).send(data);
      redisClient.del(url);
    })
    .catch((err) => res.status(500).send(err));
});
// delete vendor_invoice
router.delete(`/delete-${url}/:id`, async (req, res) => {
  await vendor_invoice
    .destroy({
      where: {
        vendor_invoice_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(204).send("deleted");
      redisClient.del(url);
    })
    .catch((err) => res.status(500).send(err));
});
module.exports = router;
