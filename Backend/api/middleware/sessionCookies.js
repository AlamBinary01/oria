const express= require("express")
const app= express()
const session = require('express-session');
const cookieParser = require('cookie-parser');
const secretKey= process.env.SECRET_KEY
// Set up session middleware
app.use(cookieParser());
app.use(session({
    secret: secretKey, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

module.exports= app
