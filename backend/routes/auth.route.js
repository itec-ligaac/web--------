const router = require('express').Router();
const { authController } = require("../controllers");
const { payloadValidation } = require("../middlewares");
const { register, login } = require("../schemas");

module.exports = router
  .post("/register", payloadValidation(register), authController.register)
  .post("/login", payloadValidation(login), authController.login)