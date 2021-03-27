const { StatusCodes } = require("http-status-codes");
const Amadeus = require('amadeus');

var amadeus = new Amadeus({
    clientId: process.env.HOTEL_API_KEY,
    clientSecret: process.env.HOTEL_API_SECRET
});

const searchByLocation = async (req, res) => {
    const { cityCode } = req.body;
    try {
        x = await amadeus.shopping.hotelOffers.get({
            cityCode : cityCode
        });
        x = JSON.parse(x.body);
        console.log(x);
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: x.data
        });
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something went wrong",
        });
    }
    
}

const searchByCoordinates = async (req, res) => {
    try {
        res.status(StatusCodes.CREATED).json({
            success: false,
            reason: "Not yet implemented - sdk doensn't offer support for coords, use basic api calls"
        });
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something went wrong",
        });
    }
}

module.exports = {
    searchByLocation,
    searchByCoordinates,
};