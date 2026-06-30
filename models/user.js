const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    unique: true,
    validate: {
      validator(v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: "Debes introducir un correo electrónico válido"
    }
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    select: false
  },
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    maxlength: [30, "El nombre no puede exceder los 30 caracteres"]
  },
  avatar: {
    type: String,
    required: false,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  }
});

module.exports = mongoose.model("User", userSchema);
