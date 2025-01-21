const jwt = require('jsonwebtoken');
const crypto = require('crypto');

async function generateVerificationToken() {
  return crypto.randomBytes(32).toString('hex');
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '50s' }); 
  }
  
// Function to generate refresh token
function generateRefreshToken(user) {
return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2m' }); // Refresh expires in 2m
}


const generateResetPasswordToken = async(user)=>{
  const resetPasswordToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' }); 
  return resetPasswordToken;
}


module.exports = { 
  generateAccessToken, 
  generateRefreshToken, 
  generateVerificationToken,
  generateResetPasswordToken
 }