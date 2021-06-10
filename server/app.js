const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//routes
const indexRouter = require("./routes/indexRouter");
const blogRouter = require("./routes/blogRouter");
const destinationRouter = require("./routes/destinationRouter");
const contactRouter = require("./routes/contactRouter");
const auth = require("./routes/auth");

app.use(indexRouter);
app.use(blogRouter);
app.use(destinationRouter);
app.use(contactRouter);
app.use(auth);

app.listen(port, () => {
  console.log(`Connection is live at port no. ${port}`);
});
