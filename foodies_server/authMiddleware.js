// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

// Middleware to protect routes
const auth = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization');

  // If no token is found, deny access
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_jwt_secret');

    // Attach the user ID from the token to the request object
    req.user = decoded.id;

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid, deny access
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth;
