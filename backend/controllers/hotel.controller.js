const { StatusCodes } = require("http-status-codes");

const searchByLocation = async (req, res) => {
    try {
        console.log(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
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
        console.log(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
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