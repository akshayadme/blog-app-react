const mongoose = require("mongoose");
const Comment = require("./commentSchema");

const blogSchema = mongoose.Schema({
  location: {
    type: String,
  },
  img: {
    type: String,
  },
  img_type: {
    type: String,
  },
  quotes: {
    type: String,
  },
  title: {
    type: String,
  },
  blog: {
    type: String,
  },
  counter: {
    type: Number,
  },
  date: {
    type: String,
    default: new Date().toDateString(),
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
