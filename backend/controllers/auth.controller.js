const { StatusCodes } = require("http-status-codes");
const { UserModel } = require("../models");
const jwt = require("jsonwebtoken");

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
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await UserModel.findOne({
        email,
      });
  
      if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "user not found",
        });
        return;
      }
  
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (!checkPassword) {
        res.status(StatusCodes.FORBIDDEN).json({
          success: false,
          message: "password doesnt match",
        });
        return;
      }
  
      const token = generateAccessToken({email});
  
      res.status(StatusCodes.OK).json({
        success: true,
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "something went wrong",
      });
    }
  };

module.exports = {
    register,
    login,
};
