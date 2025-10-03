const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
// const { PrismaClient } = require("@prisma/client");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { email, name, password1, password2 } = req.body;
    console.log(email, name, password1, password2);

    if (!email || !name || !password1 || !password2) {
      return res.status(400).json({ error: "Please provide all fields." });
    }

    const findUser = await prisma.user.findUnique({ where: { email } });
    if (findUser) {
      return res.status(400).json({ error: "Email already exists." });
    }

    if (password1 !== password2) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    if (!validator.isStrongPassword(password1)) {
      return res.status(400).json({
        error:
          "Password is weak. It must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password1, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return res.status(200).json({ success: "User registered successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Please provide all fields." });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Email not found." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Incorrect password." });

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3d" }
    );
    console.log(process.env.NODE_ENV === "production");
    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ success: "Logged in" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .clearCookie("accessToken")
      .status(200)
      .json({ success: "Logged out" });
  } catch (err) {
    return res
      .clearCookie("accessToken")
      .status(500)
      .json({ error: "Something went wrong" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, image: true },
    });
    console.log(user);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ success: user });
  } catch (err) {
    console.log("getProfile error:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.filename : undefined; // <-- use filename only
    console.log(name, image);

    const data = {};
    if (name) data.name = name;
    if (image) data.image = image;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data,
    });

    return res.status(200).json({ success: updatedUser });
  } catch (err) {
    console.log("updateProfile error:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ success: "Authenticated", user });
  } catch (err) {
    console.log("HOW MANY!");
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  verifyUser,
};
