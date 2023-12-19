const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1800s" });
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (!err) {
        req.user = {
          _id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          createdAt: user.createdAt,
        };
      }
    });
  }

  next();
}

function isAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
}

module.exports = {
  generateAccessToken,
  authMiddleware,
  isAuth,
};
