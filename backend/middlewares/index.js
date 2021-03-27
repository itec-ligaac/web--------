const { StatusCodes } = require("http-status-codes");

const payloadValidation = (schema) => async (req, res, next) => {
    try {
        schema.validateAsync(req.body).then(
            i => next()
        ).catch(
            error => {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: error.message,
                });
            }
        );
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};

module.exports = {
    payloadValidation,
};
