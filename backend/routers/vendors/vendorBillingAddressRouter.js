const express = require("express");
const router = express.Router();
const { vendor_billing_address, vendor } = require("../../models");
// const router = require("./vendorRouter");
const url = "vendor-billing-address";
const redisClient = require("../redisConnect");
// create
router.post(`/create-${url}`, async (req, res) => {
  await vendor_billing_address
    .create(req.body)
    .then((data) => {
      res.status(200).send(data);
      redisClient.del("vendors");
    })
    .catch((err) => res.status(500).send(err));
});
router.get(`/get-${url}`, async (req, res) => {
  try {
    let result = await redisClient.get(url);
    if (result !== null) {
      console.log("caching" + " " + url);
      res.status(200).send(JSON.parse(result));
    } else {
      console.log(`fetching ${url}`);
      await vendor_billing_address
        .findAll()
        .then((data) => {
          res.status(200).send(data);
          redisClient.set(url, JSON.stringify(data), { EX: 1800 });
        })
        .catch((err) => res.status(500).send(err));
    }
  } catch (err) {}
});
// update
router.put(`/update-${url}/:id`, async (req, res) => {
  await vendor_billing_address
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
  await vendor_billing_address
    .destroy({
      where: {
        vendor_billing_address_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(204).send("deleted");
      redisClient.del("vendors");
    })
    .catch((err) => res.status(500).send(err));
});

vendor.hasOne(vendor_billing_address, {
  foreignKey: "vendor_id",
});
vendor_billing_address.belongsTo(vendor, {
  foreignKey: "vendor_id",
});
module.exports = router;
