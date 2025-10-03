const express = require("express");
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} = require("../controller/authController");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/profile", getProfile);
authRouter.put("/profile", updateProfile);

module.exports = { authRouter };