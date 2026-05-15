const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");

/**
 * @POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Fill all required fields",
      });
    }

    const userExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userExists) {
      return res.status(400).json({
        message: "User with this username or email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}
/**
 * @POST /api/auth/login
 * @desc Login user using email and password
 * @access Public
 */

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return res.status(400).json({
        message: "Invalid email or password1",
      });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password2",
      });
    }

    const token = jwt.sign(
      {
        id: findUser._id,
        username: findUser.username,
        email: findUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "User Logged in successfully",
      user: {
        id: findUser._id,
        username: findUser.username,
        email: findUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}

/**
 * @GET /api/auth/logout
 * @desc Logout user by blacklisting the token
 * @access Public
 */

async function logoutUser(req, res) {
  try {
    const token = req.cookies.token;

    if (token) {
      await blacklistTokenModel.create({ token });

      res.clearCookie("token");
      return res.status(200).json({
        message: "User logged out successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}

/**
 * @GET /api/auth/get-me
 * @desc get logged in user details
 * @access Public
 */

async function getMe(req, res) {
  try {
    const user = req.user;

    return res.status(200).json({
      message: "user details fetched successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe
};
