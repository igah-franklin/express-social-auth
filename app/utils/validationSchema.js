const { z } = require('zod');

const SignupSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Passwors must be atleast 6 characters long" }),
});

const SigninSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Passwors must be atleast 6 characters long" }),
});

const ResetPasswordSchema = z.object({
    token: z.string().nonempty({ message: "Missing or invalid token" }),
    password: z.string().min(6, { message: "Passwors must be atleast 6 characters long" }),
});

const EmailVerificationSchema = z.object({
    emailVerificationToken: z.string().nonempty({ message: "Missing or invalid token" }),
});
const RefreshTokenSchema = z.object({
    refreshToken: z.string().nonempty({ message: "Missing or invalid token" }),
});


module.exports = { 
    SignupSchema, 
    SigninSchema, 
    ResetPasswordSchema,
    RefreshTokenSchema,
    EmailVerificationSchema 
}