const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
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
    return res.status(500).json({ error: err.message });
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

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
      })
      .status(200)
      .json({ success: "Logged in" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// const refresh = async (req, res) => {
//   try {
//     const token = req.cookies.refreshToken;
//     if (!token) return res.status(401).json({ error: "No refresh token" });

//     const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
//     const user = await prisma.user.findUnique({ where: { id: payload.id } });
//     if (!user || user.refreshToken !== token)
//       return res.status(403).json({ error: "Invalid refresh token" });

//     const accessToken = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "15m" }
//     );

//     return res
//       .cookie("accessToken", accessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 15 * 60 * 1000,
//       })
//       .status(200)
//       .json({ success: "Access token refreshed" });
//   } catch (err) {
//     return res.status(403).json({ error: "Invalid refresh token" });
//   }
// };

const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      await prisma.user.update({
        where: { id: payload.id },
        data: { refreshToken: null },
      });
    }
    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({ success: "Logged out" });
  } catch {
    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({ success: "Logged out" });
  }
};

const getProfile = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, name: true },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ user });
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { name, email, password } = req.body;

    const data = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: payload.id },
      data,
      select: { id: true, email: true, name: true },
    });

    return res.status(200).json({ success: "Profile updated", user: updatedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


module.exports = { register, login, logout, getProfile, updateProfile };
