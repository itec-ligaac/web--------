const { StatusCodes } = require("http-status-codes");
const fs = require('fs');

var vaccinations;

fs.readFile('./data/vaccinations.json', 'utf8', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        vaccinations = JSON.parse(data);
    }
});

const searchByCountryCode = async (req, res) => {
    try {
        const { countryCode } = req.body;

        try {
            let countryStats;
            vaccinations.forEach(element => {
                if(element.iso_code == countryCode)
                    countryStats = element;
            });
            console.log(countryStats);
            
            let total_vaccinations = 0;
            countryStats.data.forEach(element => {
                if(element.total_vaccinations != null && element.total_vaccinations > total_vaccinations)
                    total_vaccinations = element.total_vaccinations;
            });
            return res.status(StatusCodes.OK).json({
                success: true,
                message: {
                    "population":countryStats.population,
                    "total_vaccinations":total_vaccinations    
                },
            });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: `${err}`,
            });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something went wrong",
        });
    }
};

module.exports = {
    searchByCountryCode
};