const express = require("express");

const {
  vendor,
  vendor_billing_address,
  vendor_shipping_address,
  vendor_tax_information,
  vendor_bank_details,
} = require("../../models");
const redisClient = require("../redisConnect");

const router = express.Router();
const url = "vendor";
// get vendor
router.get(`/get-${url}`, async (req, res) => {
  try {
    const result = await redisClient.get("vendors");
    if (result !== null) {
      console.log("caching vendors");
      res.status(200).json(JSON.parse(result));
    } else {
      console.log("fetching vendors");
      vendor
        .findAll({
          include: [
            vendor_billing_address,
            vendor_shipping_address,
            vendor_tax_information,
            vendor_bank_details,
          ],
        })
        .then((data) => {
          res.status(200).send(data);
          redisClient.set("vendors", JSON.stringify(data), { EX: 1800 });
        });
    }
  } catch (error) {
    res.status(500).send(err);
  }
});
// create vendor
router.post(`/create-${url}`, async (req, res) => {
  await vendor
    .create(req.body)
    .then((data) => {
      res.status(201).send(data);
      redisClient.del("vendors");
    })
    .catch((err) => res.status(500).send(err));
});

// find one
router.get(`/get-${url}/:id`, async (req, res) => {
  const oneVendor = await redisClient.get("invoices");
  if (oneVendor !== null) {
    console.log("caching one vendors");
    let result = JSON.parse(oneVendor)?.filter(
      (one) => one?.vendor_id == req.params.id
    );
    return res.status(200).send(...result);
  } else {
    console.log("fetching one invoice");
    try {
      vendor
        .findOne({
          where: { vendor_id: req.params.id },
        })
        .then((data) => res.status(200).send(data));
    } catch (err) {
      res.status(500).send(err);
    }
  }
});
// update vendor
router.put(`/update-${url}/:id`, async (req, res) => {
  await vendor
    .update(req.body, {
      where: {
        vendor_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(200).send(data);
      redisClient.del("vendors");
    })
    .catch((err) => res.status(500).send(err));
});
// delete vendor
router.delete(`/delete-${url}/:id`, async (req, res) => {
  await vendor
    .destroy({
      where: {
        vendor_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(204).send("deleted");
      redisClient.del("vendors");
    })
    .catch((err) => res.status(500).send(err));
});
module.exports = router;
