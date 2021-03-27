const router = require('express').Router();
const { authController } = require("../controllers");
const { payloadValidation } = require("../middlewares");
const { register } = require("../schemas");

router.post("/register", payloadValidation(register), authController.register);

module.exports = router;
