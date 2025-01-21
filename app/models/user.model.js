const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isArchived:{
        type:Boolean,
        default:false,
    },
    isEmailVerified: Boolean,
    emailVerificationToken: String,
},{
    timestamps:true,
    collection:'users'
});

const User = mongoose.model('User', UserSchema);
module.exports = User