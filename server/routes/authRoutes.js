const express = require("express");
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  verifyUser,
} = require("../controller/authController");
const { authChecker } = require("../middleware/authCheck");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/profile", getProfile);
authRouter.put("/profile", updateProfile);
authRouter.get("/verify", authChecker, verifyUser);
module.exports = { authRouter };