const { StatusCodes } = require("http-status-codes");
const axios = require('axios')

const getWeather = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        const options = {
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER}`,
            method: 'GET'
        }
        axios(options).then(function (response) {
            res.status(StatusCodes.CREATED).json({
                success: true,
                data: response.data
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
    getWeather,
};
