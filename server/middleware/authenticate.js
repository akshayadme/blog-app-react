const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, access denied" });

    const verified = jwt.verify(token, process.env.SECRET_KEY);
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
    }
    req.user = verified._id;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { authenticate };
