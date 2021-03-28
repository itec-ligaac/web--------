const { StatusCodes } = require("http-status-codes");
const Amadeus = require('amadeus');
const axios = require('axios')
const qs = require('qs');

var amadeus = new Amadeus({
    clientId: process.env.HOTEL_API_KEY,
    clientSecret: process.env.HOTEL_API_SECRET
});

const searchByLocation = async (req, res) => {
    const { cityCode } = req.body;
    try {
        let x = await amadeus.shopping.hotelOffers.get({
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
        const { latitude, longitude } = req.body;
        let data = {
            grant_type: 'client_credentials',
            client_id: process.env.HOTEL_API_KEY,
            client_secret: process.env.HOTEL_API_SECRET
        }
        data = qs.stringify(data)
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data,
            url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
          };
        axios(options).then(function (response) {
              accessToken = response.data.access_token
              const hotelOptions = {
                url: `https://test.api.amadeus.com/v2/shopping/hotel-offers?latitude=${latitude}&longitude=${longitude}&radius=50`,
                type: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
              }
              axios(hotelOptions).then(function (params) {
                    res.status(StatusCodes.CREATED).json({
                        success: true,
                        data: params.data
                    });
              }).catch(function (err){
                console.log(err);
            });
        }).catch(function (err){
            console.log(err);
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