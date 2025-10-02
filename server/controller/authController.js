const bcrypt = require("bcrypt");
const validator = require("validator");
const prisma = require("../prisma");

const register = async (req, res) => {
  try {
    const { email, name, password1, password2 } = req.body;

    if (!email || !name || !password1 || !password2) {
      return res.status(400).json({ error: "Please provide all fields." });
    }

    const findUser = await prisma.user.findUnique({ where: { email } });
    if (findUser)
      return res.status(400).json({ error: "Email already exists." });

    if (password1 !== password2)
      return res.status(400).json({ error: "Passwords do not match." });

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

    if (!email || !password) {
      return res.status(400).json({ error: "Please provide all fields." });
    }

    const findUser = await prisma.user.findUnique({ where: { email } });

    if (!findUser) {
      return res.status(400).json({ error: "Email not found." });
    }

    const compareHash = await bcrypt.compare(password, findUser.password);

    if (!compareHash) {
      return res.status(400).json({ error: "Incorrect password." });
    }

    return res.status(200).json({ success: "Successfully logged in." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
