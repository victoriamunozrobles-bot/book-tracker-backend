const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  googleBookId: {
    type: String,
    required: [true, "El ID original del libro es obligatorio"],
  },
  title: {
    type: String,
    required: [true, "El título del libro es obligatorio"],
  },
  author: {
    type: String,
    default: "Autor desconocido",
  },
  coverImage: {
    type: String,
    default: "https://placehold.co/150x200?text=Sin+Portada",
  },
  notes: {
    type: [String],
    default: [],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El libro debe estar asociado a un usuario"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
