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
    title: Joi.string().required()
  })
});

module.exports = { validateSignup, validateSignin, validateBookBody };
