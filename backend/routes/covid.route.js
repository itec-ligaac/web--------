const router = require('express').Router();
const { covidController } = require("../controllers");
const { payloadValidation } = require("../middlewares");
const { covidCode } = require("../schemas");

module.exports = router
  .get("/", payloadValidation(covidCode), covidController.searchByCountryCode)