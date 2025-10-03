const jwt = require("jsonwebtoken");
const multer = require("multer");

const authChecker = (req, res, next) => {
  try {
    let token = req.header("Authorization")?.split(" ")[1];

    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }
    if (!token) {
      return res.status(401).json({ error: "Access token not found." });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.log("authCheck error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = { authChecker, upload };