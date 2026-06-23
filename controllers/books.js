const Book = require("../models/book");

module.exports.getSavedBooks = (req, res) => {
  Book.find({ owner: req.user._id })
    .then((books) => res.send(books))
    .catch((err) =>
      res.status(500).send({ message: "Error al obtener los libros" })
    );
};

module.exports.saveBook = (req, res) => {
  const { googleBookId, title, author, coverImage, notes } = req.body;

  Book.create({
    googleBookId,
    title,
    author,
    coverImage,
    notes,
    owner: req.user._id
  })
    .then((book) => res.status(201).send(book))
    .catch((err) =>
      res
        .status(400)
        .send({
          message: "Datos inválidos al crear el libro",
          error: err.message
        })
    );
};

module.exports.deleteBook = (req, res) => {
  Book.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    .then((book) => {
      if (!book) {
        return res
          .status(404)
          .send({
            message: "Libro no encontrado o no tienes permisos para eliminarlo"
          });
      }
      res.send({ message: "Libro eliminado con éxito", book });
    })
    .catch((err) =>
      res.status(500).send({ message: "Error al intentar eliminar el libro" })
    );
};
