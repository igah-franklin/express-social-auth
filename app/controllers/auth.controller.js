
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const { generateAccessToken, 
    generateRefreshToken, 
    generateVerificationToken,
    generateResetPasswordToken 
} = require('../services/token.service')
const { sendResetPasswordEmail } = require('../services/email.service')
const { createUser, getUserByEmail, updateUserPassword } = require('../services/user.service');
const { authenticateToken } = require('../middlewares/authenticateToken');
const { verifyPasswordResetToken } = require('../middlewares/tokenVerification');
const { SignupSchema, SigninSchema, ResetPasswordSchema, RefreshTokenSchema } = require('../utils/validationSchema')
const { formatZodErrors } = require('../utils/zodErrorFormatted')


const { INTERNAL_SERVER_ERROR, BAD_REQUEST, CONFLICT,  NOT_FOUND, UNAUTHORIZED, FORBIDDEN } = require('../utils/errorMessages');
const { REQUEST_CREATED_SUCCESS, REQUEST_SUCCESS } = require('../utils/successMessages');


exports.signUp = async (req, res) => {
    try {
        const { email, password } = SignupSchema.parse(req.body);
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(CONFLICT.status).send({
                message: 'User with this email already exists, try to login'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = await generateVerificationToken();
        const userData = {
            email: email,
            password: hashedPassword,
            isEmailVerified: false,
            emailVerificationToken: verificationCode 
        }
        await createUser(userData);
        res.status(REQUEST_CREATED_SUCCESS.status).send({
            data: email,
            message: 'User successfully created'
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(BAD_REQUEST.status).json({ message: formatZodErrors(error, "Email and password are missing or invalid")});
          } else {
            res.status(INTERNAL_SERVER_ERROR.status).send({
                message: INTERNAL_SERVER_ERROR.message,
                error: error.message 
            });
          }
    }
};

exports.signIn = async(req, res)=>{
    try {
        console.log('*** trying sign in')
        const { email, password } = SigninSchema.parse(req.body);
        const user = await getUserByEmail(email);
        if(!user){
            return res.status(NOT_FOUND.status).send({
                message:`${NOT_FOUND.message}, user with this email "${email}" does not exist.`
            })
        };

        //  if (!user.isEmailVerified) {
        //     return res.status(UNAUTHORIZED.status).send({
        //         message:`${UNAUTHORIZED.message}, "${email}" Please verify your email to login.`
        //     })
        // }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        console.log(passwordIsValid, 'passwordIsValid')

        if(!passwordIsValid){
            return res.status(UNAUTHORIZED.status).send({
                message:`${UNAUTHORIZED.message} please check your email or password`
            })
        };

        const accessToken = generateAccessToken({ id: user._id, email: user.email });
        const refreshToken = generateRefreshToken({ id: user._id, email: user.email });

        return res.status(REQUEST_SUCCESS.status).send({
            id:user._id,
            name:user.name,
            email:user.email,
            accessToken:accessToken,
            refreshToken:refreshToken
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(BAD_REQUEST.status).json({ message: formatZodErrors(error, "Email and password are missing or invalid")});
          } else {
            res.status(INTERNAL_SERVER_ERROR.status).send({
                message: INTERNAL_SERVER_ERROR.message,
                error: error.message 
            });
        }
    }
}


exports.initiatePasswordReset = async(req, res)=>{
    try {
        const email = req.body.email;
        if(!email){
            return res.status(BAD_REQUEST.status).send({
                message:`${BAD_REQUEST.message}, invalid email`
            })
        }
        const user = await getUserByEmail(email);
        if(!user){
            return res.status(NOT_FOUND.status).send({
                message:`${NOT_FOUND.message}, user with this email "${email}" does not exist.`
            })
        };
        const resetPasswordToken = await generateResetPasswordToken({ id: user._id, email: user.email });
        await sendResetPasswordEmail(email, resetPasswordToken);
        return res.status(REQUEST_SUCCESS.status).json({
            message:"password reset link sent successfully"
        })
    } catch (error) {
        console.log(error, 'err')
        return res.status(INTERNAL_SERVER_ERROR.status).send(INTERNAL_SERVER_ERROR.message)
    }
}

exports.resetPassword = async(req, res)=>{
    try {
        const { token, password } = ResetPasswordSchema.parse(req.body);
        const verifiedToken = await verifyPasswordResetToken(token);
        console.log(verifiedToken, 'verifiedToken')
        if(!verifiedToken){
            return res.status(UNAUTHORIZED.status).send(UNAUTHORIZED.message);
        }
        // Update the user's password
        await updateUserPassword(verifiedToken.id, password);

        res.status(REQUEST_SUCCESS.status).json({ message: 'password reset successful!'})

    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(BAD_REQUEST.status).json({ message: formatZodErrors(error, "failed to validate, please try again!")});
          } else {
            res.status(INTERNAL_SERVER_ERROR.status).send({
                message: INTERNAL_SERVER_ERROR.message,
                error: error.message 
            });
        }
    }
}




exports.refreshToken = async(req, res)=>{
    try {
        const { refreshToken } = RefreshTokenSchema.parse(req.body);
        jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(FORBIDDEN.status).send({
                message:`${FORBIDDEN.message}, You are not allowed`
            });
            //const accessToken = generateAccessToken({ id: user._id, email: user.email });
            const refreshToken = generateRefreshToken({ id: user._id, email: user.email });
            res.send({ refreshToken });
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(BAD_REQUEST.status).json({ message: formatZodErrors(error, "failed to validate, please try again!")});
          } else {
            res.status(INTERNAL_SERVER_ERROR.status).send({
                message: INTERNAL_SERVER_ERROR.message,
                error: error.message 
            });
        }
    }
}


