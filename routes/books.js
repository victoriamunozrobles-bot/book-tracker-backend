const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getSavedBooks, saveBook, deleteBook } = require("../controllers/books");

router.get("/", auth, getSavedBooks);
router.post("/", auth, saveBook);
router.delete("/:id", auth, deleteBook);

module.exports = router;
