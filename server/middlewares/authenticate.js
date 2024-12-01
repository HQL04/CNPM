const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  try {
    if (!req.header("authorization")) {
      return res.status(401).json({
        error: "No authorization header",
      });
    }
    const token = req.header("authorization").split(" ")[1];
    if (!token) {
      return res.status(401).send("Truy cập bị từ chối");
    }
    jwt.verify(token, "the-super-strong-secret", (err, decoded) => {
      if (err) {
        return res.status(401).send("Truy cập bị từ chối");
      }

      req.userInfo = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: "Authentication error",
      details: err.message,
    });
  }
}

module.exports = authenticate;
