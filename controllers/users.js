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

module.exports.createUser = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash
      })
    )
    .then((user) => {
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(201).send(userResponse);
    })
    .catch((err) => {
      if (err.name === "MongoServerError" && err.code === 11000) {
        res
          .status(409)
          .send({ message: "El correo electrónico ya está registrado" });
      } else {
        res
          .status(400)
          .send({ message: "Datos inválidos", error: err.message });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Se requiere correo electrónico y contraseña" });
  }

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Credenciales incorrectas"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Credenciales incorrectas"));
        }
        return user;
      });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.NODE_ENV === "production"
          ? process.env.JWT_SECRET
          : "super-secreto-dev",
        { expiresIn: "7d" },
        {
          expiresIn: "7d"
        }
      );

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
