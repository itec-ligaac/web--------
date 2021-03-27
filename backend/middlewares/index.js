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
const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

        if (!token) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
            });
            return;
        }

        jwt.verify(token, process.env.SECRET, (err, user) => {
            console.log(err)
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};

module.exports = {
    payloadValidation,
    requireAuth
};
