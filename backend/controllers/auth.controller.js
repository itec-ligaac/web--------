const { StatusCodes } = require("http-status-codes");
const { UserModel } = require("../models");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const oldUser = await UserModel.findOne({
            email,
        });

        const hash = bcrypt.hashSync(password, 10);
        await UserModel.create({
            username,
            email,
            password: hash,
        }).then(
            i => res.status(StatusCodes.CREATED).json({
                success: true,
            })
        ).catch(
            error => res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: "user alredy exists",
            })
        );
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something went wrong",
        });
    }
};
const auth = async (req, res) => {
};

module.exports = {
    register,
    auth,
};
