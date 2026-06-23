const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");

const userRoutes = require("./users");
const bookRoutes = require("./books");

router.post("/signup", createUser);
router.post("/signin", login);

router.use(authMiddleware);

router.use("/users", userRoutes);
router.use("/books", bookRoutes);

router.use((req, res) => {
  res.status(404).send({ message: "Recurso no encontrado" });
});

module.exports = router;
