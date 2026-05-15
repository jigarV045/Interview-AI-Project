const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// const Router = require("express");
// const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);
router.get("/get-me", authMiddleware.authUser, authController.getMe);

module.exports = router;
