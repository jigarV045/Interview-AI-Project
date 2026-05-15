const jwt = require("jsonwebtoken");
const blacklistTokens = require("../models/blacklistToken.model");

async function authUser(req, res, next) {
    let token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    const tokenBlacklisted = await blacklistTokens.findOne({token});
    if (tokenBlacklisted) {
        return res.status(401).json({
            message: "token is invalid"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

module.exports = {
    authUser
}