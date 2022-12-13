const express = require("express");
const router = express.Router();
const { address, company } = require("../../models");
// const router = require("./companyRouter");
const url = "address";
const redisClient = require("../redisConnect");
// create

router.post(`/create-${url}`, async (req, res) => {
  await address
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
      await address.findAll().then((data) => {
        res.status(200).send(data);
        redisClient.set(url, JSON.stringify(data), { EX: 1800 });
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
// update address
router.put(`/update-${url}/:id`, async (req, res) => {
  await address
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
// delete address
router.delete(`/delete-${url}/:id`, async (req, res) => {
  await address
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
company.hasOne(address, {
  foreignKey: "company_id",
});
address.belongsTo(company, {
  foreignKey: "company_id",
});
module.exports = router;
