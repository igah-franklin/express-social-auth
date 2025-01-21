const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model')
const { generateAccessToken, generateRefreshToken } = require('../services/token.service');


const { INTERNAL_SERVER_ERROR, BAD_REQUEST, CONFLICT,  NOT_FOUND, UNAUTHORIZED, FORBIDDEN } = require('../utils/errorMessages');


exports.googleCreateRedirectURL = async(req, res)=>{
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        client_id: process.env.GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(' ')
    };

    const qs = new URLSearchParams(options);
    res.send({
        redirectUrl: `${rootUrl}?${qs.toString()}`
    });
}

exports.googleCallbackURL = async(req, res)=>{
    try {
        
        const code = req.query.code;

        if (!code) {
          return res.status(BAD_REQUEST.status).json({ message: "Authorization code is missing." });
        }
      
        const { id_token, access_token } = await getTokens({
          code,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          redirectUri: process.env.GOOGLE_REDIRECT_URI
        });
      
        const googleUser = await axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
              headers: {
                Authorization: `Bearer ${id_token}`
              }
            }
          )
          .then(res => res.data)
          .catch(error => {
            throw new Error(error.message);
          });
        let user = await User.findOne({ email: googleUser.email });
        if (!user) {
            user = new User({
                email: googleUser.email,
                isEmailVerified: true,
            });
            await user.save();
        }
        const accessToken = generateAccessToken({ id: user._id, email: user.email });
        const refreshToken = generateRefreshToken({ id: user._id, email: user.email });
    
        return res.status(200).json({
            id:user._id,
            email:user.email,
            accessToken:accessToken,
            refreshToken:refreshToken
        })
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR.status).send({ message: INTERNAL_SERVER_ERROR.message });
    }
}

async function getTokens({ code, clientId, clientSecret, redirectUri }) {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    };
    try {
        const response = await axios.post(url, new URLSearchParams(values).toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        if (!response.data) {
            throw new Error('No data received from Google token endpoint');
          }
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error response from Google token endpoint:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
          } else if (error.request) {
            console.error('No response received from Google token endpoint:', error.request);
          } else {
            console.error('Error setting up the request to Google token endpoint:', error.message);
          }
          throw new Error('Failed to fetch tokens from Google');
    }
  }
