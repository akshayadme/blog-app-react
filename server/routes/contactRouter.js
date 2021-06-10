const express = require("express");
const router = express.Router();
const Contact = require("../models/contactSchema");

router.post("/contact", async (req, res) => {
  try {
    await Contact.create(req.body);
    res.status(201).send({ msg: "Message posted successfully" });
  } catch (error) {
    console.log(error);
    req.flash("Cannot post your Message!! Error Occured.");
  }
});

module.exports = router;
