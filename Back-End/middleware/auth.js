// Import the jsonwebtoken library 
const jwt = require('jsonwebtoken');

// get environment variables from .env 
require('dotenv').config();

// Middleware function to authenticate requests using JWT
const authenticate = (req, res, next) => {
  // Get the JWT token from the request headers
  const token = req.headers.authorization || '';

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // If the token is invalid or expired, send  response
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // If the token is valid, decode it and attach the decoded payload to the request object
    req.user = decoded;

    // Call the next middleware function in the stack
    next();
  });
};

// Export the authenticate middleware function
module.exports = { authenticate };
