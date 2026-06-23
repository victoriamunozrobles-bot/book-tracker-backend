const User = require("../models/user");

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      res.send({ name: user.name, email: user.email });
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Error interno del servidor", error: err.message })
    );
};
