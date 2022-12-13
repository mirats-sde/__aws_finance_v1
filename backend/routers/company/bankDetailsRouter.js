const express = require("express");
const router = express.Router();
const { bank_details, company } = require("../../models");
const url = "bank-details";

const redisClient = require("../redisConnect");
// create
router.post(`/create-${url}`, async (req, res) => {
  await bank_details
    .create(req.body)
    .then((data) => {
      res.status(200).send(data);
      redisClient.del("company");
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
      await bank_details.findAll().then((data) => {
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
  await bank_details
    .update(req.body, {
      where: {
        company_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(200).send(data);
      redisClient.del("company");
    })
    .catch((err) => res.status(500).send(err));
});
// delete
router.delete(`/delete-${url}/:id`, async (req, res) => {
  await bank_details
    .destroy({
      where: {
        company_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(204).send("deleted");
      redisClient.del("company");
    })
    .catch((err) => res.status(500).send(err));
});
company.hasOne(bank_details, {
  foreignKey: "company_id",
});
bank_details.belongsTo(company, {
  foreignKey: "company_id",
});
module.exports = router;
