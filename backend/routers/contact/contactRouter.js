const express = require("express");
const router = express.Router();
const { contact, customers } = require("../../models");
const url = "contact";
const redisClient = require("../redisConnect");
// create
router.post(`/create-${url}`, async (req, res) => {
  await contact
    .create(req.body)
    .then((data) => {
      res.status(200).send(data);
      redisClient.del("customer");
    })
    .catch((err) => res.status(500).send(err));
});
router.get(`/get-${url}`, async (req, res) => {
  try {
    const result = await redisClient.get("customer");
    if (result !== null) {
      console.log(`caching ${url}`);
      res.status(200).send(JSON.parse(result));
    } else {
      console.log(`fetching ${url}`);
      await contact.findAll().then((data) => {
        res.status(200).send(data);
        redisClient.set("customer", JSON.stringify(data), { EX: 1800 });
      });
    }
  } catch (er) {
    res.status(500).send(err);
  }
});
// update
router.put(`/update-${url}/:id`, async (req, res) => {
  await contact
    .update(req.body, {
      where: {
        contact_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(200).send(data);
      redisClient.del("customer");
    })
    .catch((err) => res.status(500).send(err));
});
router.delete(`/delete-${url}/:id`, async (req, res) => {
  await contact
    .destroy({
      where: {
        contact_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(204).send("deleted");
      redisClient.del("customer");
    })
    .catch((err) => res.status(500).send(err));
});

customers.hasMany(contact, {
  foreignKey: "customer_id",
});
contact.belongsTo(customers, {
  foreignKey: "customer_id",
});
module.exports = router;
