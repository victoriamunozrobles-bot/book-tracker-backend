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
      res.status(400).send({
        message: "Datos inválidos al crear el libro",
        error: err.message
      })
    );
};

module.exports.deleteBook = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (!book) {
        const err = new Error("Libro no encontrado");
        err.statusCode = 404;
        return next(err);
      }

      if (book.owner.toString() !== req.user._id) {
        const err = new Error("No tienes permisos para eliminar este libro");
        err.statusCode = 403;
        return next(err);
      }

      return book
        .deleteOne()
        .then(() => res.send({ message: "Libro eliminado" }));
    })
    .catch(next);
};
