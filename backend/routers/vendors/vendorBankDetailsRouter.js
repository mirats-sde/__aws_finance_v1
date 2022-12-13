const express = require("express");
const router = express.Router();
const { vendor_bank_details, vendor } = require("../../models");
const url = "vendor-bank-details";
const redis = require("redis");

const redisClient = require("../redisConnect");
// create
router.post(`/create-${url}`, async (req, res) => {
  await vendor_bank_details
    .create(req.body)
    .then((data) => {
      res.status(200).send(data);
      redisClient.del("vendors");
    })
    .catch((err) => res.status(500).send(err));
});
// get all
router.get(`/get-${url}`, async (req, res) => {
  try {
    const result = await redisClient.get(url);
    if (result !== null) {
      console.log("caching vendors");
      res.status(200).json(JSON.parse(result));
    } else {
      console.log("fetching vendors");
      await vendor_bank_details.findAll().then((data) => {
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
  await vendor_bank_details
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
// delete
router.delete(`/delete-${url}/:id`, async (req, res) => {
  await vendor_bank_details
    .destroy({
      where: {
        bank_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(204).send("deleted");
      redisClient.del("vendors");
    })
    .catch((err) => res.status(500).send(err));
});
vendor.hasOne(vendor_bank_details, {
  foreignKey: "vendor_id",
});
vendor_bank_details.belongsTo(vendor, {
  foreignKey: "vendor_id",
});
module.exports = router;
