const express = require("express");
const { bank_transaction } = require("../../models");
const router = express.Router();
const url = "bank-transaction";
const redisClient = require("../redisConnect");

// create bank_transaction
router.post(`/create-${url}`, async (req, res) => {
  await bank_transaction
    .create(req.body)
    .then((data) => {
      res.status(201).send(data);
      redisClient.del(url);
    })
    .catch((err) => res.status(500).send(err));
});
// get companies
router.get(`/get-${url}`, async (req, res) => {
  try {
    const result = await redisClient.get(url);
    if (result !== null) {
      console.log(`caching ${url}`);
      res.status(200).send(JSON.parse(result));
    } else {
      console.log(`fetching ${url}`);
      bank_transaction.findAll({}).then((data) => {
        res.status(200).send(data);
        redisClient.set(url, JSON.stringify(data), { EX: 1800 });
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
// update bank_transaction
router.put(`/update-${url}/:id`, async (req, res) => {
  await bank_transaction
    .update(req.body, {
      where: {
        bank_transaction_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(200).send(data);
      redisClient.del(url);
    })
    .catch((err) => res.status(500).send(err));
});
// delete company
router.delete(`/delete-${url}/:id`, async (req, res) => {
  await bank_transaction
    .destroy({
      where: {
        bank_transaction_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(204).send("deleted");
      redisClient.del(url);
    })
    .catch((err) => res.status(500).send(err));
});
module.exports = router;
