const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { createUser, login } = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");

const userRoutes = require("./users");
const bookRoutes = require("./books");

router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8)
    })
  }),
  createUser
);

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required()
    })
  }),
  login
);

router.use(authMiddleware);

router.use("/users", userRoutes);
router.use("/books", bookRoutes);

router.use((req, res) => {
  res.status(404).send({ message: "Recurso no encontrado" });
});

module.exports = router;
