
const { z } = require('zod');
const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../utils/errorMessages');
const User = require('../models/user.model');
const { EmailVerificationSchema } = require('../utils/validationSchema');

exports.verifyEmail = async (req, res) => {
    try {
        const { emailVerificationToken } = EmailVerificationSchema.parse(req.body);
        const user = await User.findOne({ emailVerificationToken: emailVerificationToken });

        if (!user) {
            return res.status(BAD_REQUEST.status).send({
                message: `${BAD_REQUEST.message}, token is invalid or has expired`
            });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = null;
        await user.save();

        return res.status(200).send({
            message: "Email successfully verified"
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle Zod validation error
            res.status(BAD_REQUEST.status).json({
                message: formatZodErrors(error, "Email verification token is invalid or missing")
            });
        } else {
            // Log and handle internal server errors
            console.error('Internal Server Error:', error);
            res.status(INTERNAL_SERVER_ERROR.status).send({
                message: INTERNAL_SERVER_ERROR.message,
                error: error.message 
            });
        }
    }
};
