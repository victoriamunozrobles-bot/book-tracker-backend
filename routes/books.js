const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getSavedBooks,
  saveBook,
  deleteBook,
  createBook
} = require("../controllers/books");
const { validateBookBody } = require("../middlewares/validations");

router.get("/", auth, getSavedBooks);
router.post("/", auth, saveBook);
router.delete("/:id", auth, deleteBook);
router.post("/", validateBookBody, createBook);

module.exports = router;
