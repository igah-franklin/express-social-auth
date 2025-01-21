const jwt = require('jsonwebtoken');

async function verifyPasswordResetToken(token) {
  if (!token) {
    throw new Error('Token is required');
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, 'decoded token')
    return decoded; // Return the decoded token payload
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

module.exports = { verifyPasswordResetToken };

