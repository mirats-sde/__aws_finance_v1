const express = require("express");
const { vendor_tax_information, vendor } = require("../../models");
const router = express.Router();
const url = "vendor-tax-information";
// create vendor_tax-information
const redisClient = require("../redisConnect");
router.post(`/create-${url}`, async (req, res) => {
  await vendor_tax_information
    .create(req.body)
    .then((data) => {
      res.status(201).send(data);
      redisClient.del("vendors");
    })
    .catch((err) => res.status(500).send(err));
});
// get vendor_tax-information
router.get(`/get-${url}`, async (req, res) => {
  try {
    let result = await redisClient.get(url);
    if (result !== null) {
      console.log(`caching ${url}`);
      res.status(200).send(JSON.parse(result));
    } else {
      console.log(`fetching ${url}`);
      vendor_tax_information.findAll().then((data) => {
        res.status(200).send(data);
        redisClient.set(url, JSON.stringify(data), { EX: 1800 });
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
// update vendor_tax_information
router.put(`/update-${url}/:id`, async (req, res) => {
  await vendor_tax_information
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
// delete vendor_tax_information
router.delete(`/delete-${url}/:id`, async (req, res) => {
  await vendor_tax_information
    .destroy({
      where: {
        vendor_tax_information_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(204).send("deleted");
      redisClient.del("vendors");
    })
    .catch((err) => res.status(500).send(err));
});
vendor.hasOne(vendor_tax_information, {
  foreignKey: "vendor_id",
});
vendor_tax_information.belongsTo(vendor, {
  foreignKey: "vendor_id",
});
module.exports = router;
