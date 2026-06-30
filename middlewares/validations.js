const { celebrate, Joi } = require("celebrate");

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
  })
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
  })
});

const validateBookBody = celebrate({
  body: Joi.object().keys({
    googleBookId: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().allow(""),
    coverImage: Joi.string().allow(""),
    startDate: Joi.string().required(),
    endDate: Joi.string().allow("", null),
    status: Joi.string().valid("Leyendo", "Terminado").required()
  })
});

module.exports = { validateSignup, validateSignin, validateBookBody };
