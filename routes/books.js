const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getSavedBooks, saveBook, deleteBook } = require("../controllers/books");
const { validateBookBody } = require("../middlewares/validations");

router.get("/", auth, getSavedBooks);
router.post("/", auth, validateBookBody, saveBook);
router.delete("/:id", auth, deleteBook);

module.exports = router;
