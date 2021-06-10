const express = require("express");
const router = express.Router();
const Blog = require("../models/blogSchema");

router.get("/", async (req, res) => {
  try {
    const blogDetails = await Blog.find({});
    res.status(200).json({ blogDetails });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
