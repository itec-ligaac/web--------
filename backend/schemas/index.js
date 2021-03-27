const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const register = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

module.exports = {
    register,
    login
};
