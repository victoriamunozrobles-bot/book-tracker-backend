module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.name === "MongoServerError" && err.code === 11000) {
    return res
      .status(409)
      .send({ message: "El correo electrónico ya está registrado" });
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).send({ message: "Datos inválidos proporcionados" });
  }

  res.status(statusCode).send({
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor" : message
  });
};
