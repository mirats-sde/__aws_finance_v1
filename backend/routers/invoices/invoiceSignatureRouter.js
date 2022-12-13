const express = require("express");
const router = express.Router();
const { signature } = require("../../models");
const url = "signature";
// get all
router.get(`/get-${url}`, async (req, res) => {
  try {
    await signature.findAll().then((data) => {
      res.status(200).send(data);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
// create
router.post(`/create-${url}`, async (req, res) => {
  try {
    await signature.create(req.body).then((data) => {
      res.status(200).send(data);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// update invoice signature
router.put(`/update-${url}/:id`, async (req, res) => {
  try {
    await signature
      .update(req.body, {
        where: {
          signature_id: req.params.id,
        },
      })
      .then((data) => {
        res.status(200).send(data);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});
router.delete(`/delete-${url}/:id`, async (req, res) => {
  try {
    await signature
      .destroy({
        where: {
          signature_id: req.params.id,
        },
      })
      .then((data) => {
        res.status(204).send("deleted");
      });
  } catch (error) {
    res.status(500).send(err);
  }
});
module.exports = router;
