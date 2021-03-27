const router = require('express').Router();
const { weatherController } = require("../controllers");
const { payloadValidation } = require("../middlewares");
const {  hotelCoordinates } = require("../schemas");

module.exports = router
  .get("/", payloadValidation(hotelCoordinates), weatherController.getWeather)