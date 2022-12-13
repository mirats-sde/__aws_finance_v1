const express = require("express");
const router = express.Router();
const { billing_address, customers } = require("../../models");
// const router = require("./customersRouter");
const url = "billing-address";
// create
router.post(`/create-${url}`, async (req, res) => {
  await billing_address
    .create(req.body)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});
router.get(`/get-${url}`, async (req, res) => {
  await billing_address
    .findAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});
// update
router.put(`/update-${url}/:id`, async (req, res) => {
  await billing_address
    .update(req.body, {
      where: {
        customer_id: req.params.id,
      },
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});
// delete
router.delete(`/delete-${url}/:id`, async (req, res) => {
  await billing_address
    .destroy({
      where: {
        billing_address_id: req.params.id,
      },
    })
    .then((data) => res.status(204).send("deleted"))
    .catch((err) => res.status(500).send(err));
});

customers.hasOne(billing_address, {
  foreignKey: "customer_id",
});
billing_address.belongsTo(customers, {
  foreignKey: "customer_id",
});
module.exports = router;
