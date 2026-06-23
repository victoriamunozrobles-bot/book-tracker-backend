const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .send({ message: "Autorización denegada. Token faltante." });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "super-secreto-dev");
  } catch (err) {
    return res
      .status(401)
      .send({ message: "Autorización denegada. Token inválido." });
  }

  req.user = payload;

  next();
};
