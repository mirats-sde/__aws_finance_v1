const express = require("express");
const { client_report } = require("../../models");
const router = express.Router();
const url = "client-report";
const redisClient = require("../redisConnect");
// create client_report
router.post(`/create-${url}`, async (req, res) => {
  await client_report
    .create(req.body)
    .then((data) => {
      res.status(201).send(data);
      redisClient.del(url);
    })
    .catch((err) => res.status(500).send(err));
});
// get client_report
router.get(`/get-${url}`, async (req, res) => {
  console.log("inside report");
  try {
    const result = await redisClient.get(url);
    if (result !== null) {
      console.log(`caching ${url}`);
      res.status(200).send(JSON.parse(result));
    } else {
      console.log(`fetching ${url}`);
      client_report.findAll({}).then((data) => {
        res.status(200).send(data);
        redisClient.set(url, JSON.stringify(data), { EX: 1800 });
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
// update client_report
router.put(`/update-${url}/:id`, async (req, res) => {
  await client_report
    .update(req.body, {
      where: {
        client_report_id: req.params.id,
      },
    })
    .then((data) => {
      redisClient.del(url);
      redisClient.del(url);
    })
    .catch((err) => res.status(500).send(err));
});
// delete client_report
router.delete(`/delete-${url}/:id`, async (req, res) => {
  await client_report
    .destroy({
      where: {
        client_report_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(204).send("deleted");
      redisClient.del(url);
    })
    .catch((err) => res.status(500).send(err));
});
module.exports = router;
