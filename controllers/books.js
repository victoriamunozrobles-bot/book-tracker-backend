const Book = require("../models/book");

module.exports.getSavedBooks = (req, res, next) => {
  Book.find({ owner: req.user._id })
    .then((books) => res.send(books))
    .catch(next);
};

module.exports.saveBook = (req, res, next) => {
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
    .catch(next);
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

module.exports.createBook = (req, res, next) => {
  const owner = req.user._id;

  Book.create({ ...req.body, owner })
    .then((book) => {
      res.status(201).send(book);
    })
    .catch(next);
};
