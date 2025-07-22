const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("🔐 Incoming token:", token); // Log token

  if (!token) {
    console.log("⛔ No token found");
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded); // Log decoded token

    const userId = decoded.userId || decoded.id;
    const user = await User.findById(userId);
    
    if (!user) {
      console.log("❌ No user found for ID:", userId);
      return res.status(401).json({ msg: "User not found" });
    }

    console.log("👤 Authenticated user:", user.username); // Log authenticated username

    req.user = user;
    next();
  } catch (err) {
    console.log("❌ Token error:", err.message);
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
