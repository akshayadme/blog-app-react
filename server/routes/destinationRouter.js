const express = require("express");
const router = express.Router();
const Blog = require("../models/blogSchema");

router.get("/destination", async (req, res) => {
  try {
    const getData = await Blog.find().distinct(
      "location",
      async (error, ids) => {
        const destination = await Promise.all(
          ids.map(
            async (currData) => await Blog.findOne({ location: `${currData}` })
          )
        );
        res.status(200).json({ destination });
      }
    );
  } catch (error) {
    console.log(error);
    res.render("error");
  }
});

router.get("/destination/place", async (req, res) => {
  try {
    const location = req.query.location;
    const blogs = await Blog.find({ location: location });
    res.status(200).json({ blogs, location });
  } catch (error) {
    console.log(error);
    res.render("error");
  }
});

module.exports = router;
