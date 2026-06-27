const mongoose = require("mongoose");
const app = require("./app");
const { MONGO_URI } = require("./utils/config");

const { PORT = 3000 } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");

    app.listen(PORT, () => {
      console.log(`Servidor de Book Tracker corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error conectando a la base de datos:", err);
  });
