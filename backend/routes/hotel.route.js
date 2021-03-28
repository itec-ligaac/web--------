const router = require('express').Router();
const { hotelController } = require("../controllers");
const { payloadValidation } = require("../middlewares");
const { hotelLocation, hotelCoordinates } = require("../schemas");

module.exports = router
  .get("/location", payloadValidation(hotelLocation), hotelController.searchByLocation)
  .get("/coordinates", payloadValidation(hotelCoordinates), hotelController.searchByCoordinates)