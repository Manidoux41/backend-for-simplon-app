import jwt from "jsonwebtoken";


const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Access denied: admin only' });
};

// Middleware to check if user is driver
export const isDriver = (req, res, next) => {
  if (req.user && req.user.role === 'driver') {
    return next();
  }
  return res.status(403).json({ error: 'Access denied: driver only' });
};

export default auth;
