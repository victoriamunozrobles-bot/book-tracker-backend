const router = require("express").Router();
const auth = require("../middlewares/auth");
const userRouter = require("./users");
const bookRouter = require("./books");

const { createUser, login } = require("../controllers/users");
const {
  validateSignup,
  validateSignin
} = require("../middlewares/validations");

router.post("/signup", validateSignup, createUser);
router.post("/signin", validateSignin, login);

router.use(auth);

router.use("/users", userRouter);
router.use("/books", bookRouter);

router.use((req, res) => {
  res.status(404).send({ message: "Ruta no encontrada" });
});

module.exports = router;
