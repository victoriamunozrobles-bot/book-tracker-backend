const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3000 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/book_tracker_db")
  .then(() => {
    console.log("✅ Conectado exitosamente a MongoDB");
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
  });

app.use(cors());

app.use(express.json());

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend arrancando en el puerto ${PORT}`);
});
