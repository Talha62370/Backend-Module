const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (Splits "Bearer <token>" into an array and grabs the token)
      token = req.headers.authorization.split(' ')[1];

      // Verify token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add the user ID from the token payload to the request object
      req.user = decoded;

      // Pass control to the next middleware or controller
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };