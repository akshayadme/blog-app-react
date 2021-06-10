const express = require("express");
const router = express.Router();
const Blog = require("../models/blogSchema");
const Comment = require("../models/commentSchema");
const { authenticate } = require("../middleware/authenticate");

router.post("/blog", authenticate, async (req, res, next) => {
  try {
    const blogCreated = await Blog.create(req.body);
    const count = await Blog.countDocuments();
    blogCreated.counter = count;
    blogCreated.save();
    res.status(201).send({ msg: "Blog posted successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/comment/:id", async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    let comment = new Comment(req.body);

    blog.comments.push(comment);

    blog.save();
    comment.save();
    res.status(201).send({ msg: "Comment posted successfully!!" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const foundBlog = await Blog.findById(req.params.id).populate("comments");
    res.status(200).json({ foundBlog });
  } catch (error) {
    console.log(error);
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const getBlog = await Blog.findById(req.params.id);
    res.status(200).json({ getBlog });
  } catch (error) {
    console.log(error);
  }
});

router.patch("/edit/:id", authenticate, async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).send({ msg: "Blog Updated Successfully!!" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/blog/:id/delete", authenticate, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: "Blog deleted successfully!!!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
