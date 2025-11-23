import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect routes (Require login)
export const protect = async (req, res, next) => {
  let token = null;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return res.status(401).json({ message: "Not authorized, token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) return res.status(401).json({ message: "User not found" });

    next();
  } catch (err) {
    console.error("JWT Error:", err);
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

// Restrict routes based on user role (admin/vendor/customer)
export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authorized" });

    if (req.user.role !== role)
      return res.status(403).json({ message: "Forbidden: Insufficient role" });

    next();
  };
};
