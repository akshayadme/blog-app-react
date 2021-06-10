const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
});

const contact = mongoose.model("Contact", contactSchema);
module.exports = contact;
