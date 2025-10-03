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
const {upload} = require("../middleware/authCheck")
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/profile", authChecker, getProfile);
authRouter.patch("/profile", authChecker, upload.single('image') ,updateProfile);
authRouter.get("/verify", authChecker, verifyUser);
module.exports = { authRouter };