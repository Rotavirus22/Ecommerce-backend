const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer", "").trim();

    const jwt_payload = jsonwebtoken.verify(accessToken, process.env.jwt_salt);

    req.user = jwt_payload;
  } catch (e) {
    res.status(401).json({
      status: "failed",
      message: "You need to login to perform this task",
    });
    return;
  }
  next();
};
module.exports = auth;
