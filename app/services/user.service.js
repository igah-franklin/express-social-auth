const bcrypt = require("bcrypt");
const User = require('../models/user.model');
const { sendVerificationEmail, notifyAdminSignup } = require('./email.service');

const createUser = async(userData)=>{
    const newUser = new User({
        email: userData.email,
        password: userData.password,
        isEmailVerified: userData.isEmailVerified,
        emailVerificationToken: userData.emailVerificationToken
    });
    await sendVerificationEmail(newUser.email, newUser.emailVerificationToken);
    await notifyAdminSignup(newUser.email);
    await newUser.save();
}

const getUserByEmail = async(email)=>{
    const user = await User.findOne({
        email:email
    });
    return user;
}   

const updateUserPassword = async (userId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the password
    const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
    return user;
  };



module.exports = {
    createUser,
    getUserByEmail,
    updateUserPassword
}