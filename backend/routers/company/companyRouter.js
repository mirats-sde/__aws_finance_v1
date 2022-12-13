const express = require("express");
const { company, address, bank_details } = require("../../models");
const router = express.Router();
const url = "company";
const redisClient = require("../redisConnect");
// create company
router.post(`/create-${url}`, async (req, res) => {
  await company
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
      company.findAll({ include: [address, bank_details] }).then((data) => {
        res.status(200).send(data);
        redisClient.set(url, JSON.stringify(data), { EX: 1800 });
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
// find one
router.get(`/get-${url}/:id`, async (req, res) => {
  const oneCompany = await redisClient.get(url);
  if (oneCompany !== null) {
    console.log("caching one " + url);
    let result = JSON.parse(oneCompany)?.filter(
      (one) => one?.company_id == req.params.id
    );
    return res.status(200).send(...result);
  } else {
    console.log("fetching one " + url);
    company
      .findOne({
        where: { company_id: req.params.id },
        include: [address, bank_details],
      })
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err));
  }
});

// update company
router.put(`/update-${url}/:id`, async (req, res) => {
  await company
    .update(req.body, {
      where: {
        company_id: req.params.id,
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
  await company
    .destroy({
      where: {
        company_id: req.params.id,
      },
    })
    .then((data) => {
      res.status(204).send("deleted");
      redisClient.del(url);
    })
    .catch((err) => res.status(500).send(err));
});
module.exports = router;
