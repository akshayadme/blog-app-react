const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  comment: {
    type: String,
  },
  commentTitle: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  dateCreated: {
    default: new Date().toDateString(),
    type: String,
  },
});

const comment = mongoose.model("Comment", commentSchema);
module.exports = comment;
