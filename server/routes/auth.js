const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const { authenticate } = require("../middleware/authenticate");

//User Registration
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(422).json({ error: "All field are required!!!" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({ error: "User already exists" });
    } else {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      const userInsert = new User({
        username,
        email,
        password: hash,
      });

      await userInsert.save();
      res.status(200).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

//User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(422).json({ msg: "All field are required!!" });

    const getUser = await User.findOne({ email: email });

    if (!getUser)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, getUser.password);

    if (!isMatch) return res.status(422).json({ msg: "Invalid credientials" });

    const token = jwt.sign({ _id: getUser._id }, process.env.SECRET_KEY, {
      expiresIn: 3600,
    });
    res.json({
      token,
      userDetails: getUser,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
    console.log(error);
  }
});

// token is valid or not
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    if (!verified) return res.json(false);
    const user = await User.findById(verified._id);
    if (!user) return res.json(false);
    return res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getUser", authenticate, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ user });
});

module.exports = router;
