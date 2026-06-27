const mongoose = require("mongoose");
const app = require("./app");
const { MONGO_URI } = require("./utils/config");

const { PORT = 3000 } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Conectado exitosamente a MongoDB");

    app.listen(PORT, () => {
      console.log(`Servidor backend arrancando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
  });
