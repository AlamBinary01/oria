const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user'); 
const transporter = require('../mail/email'); // Make sure the path to the email transporter is correct
const secretKey = process.env.SECRET_KEY;
const mailAddress = process.env.MAIL_USER;
const session = require('express-session');
const router = express.Router();

// Configure session middleware
router.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
}));

// Sign Up
router.post('/signup', async (req, res) => {
    try {
        const { companyName, firstName, lastName, email, password } = req.body;

        if (!companyName || !lastName || !firstName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            companyName,
            firstName,
            lastName,   
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        req.session.userEmail = savedUser.email;

        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ error: 'Failed to signup. Please try again later.' });
    }
});

// Login
router.post('/login', async (req, res) => {

    console.log(req.body)

    try {
        const user = await User.findOne({ email: req.body.email }).exec();

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Password or email matching failed' });
        }

        req.session.userEmail = user.email;

        const token = jwt.sign(
            { email: user.email, password: user.password },
            secretKey,
            { expiresIn: '24h' }
        );

        res.cookie('token', token);
        res.status(200).json({
            email: user.email,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login' });
    }
});



// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.clearCookie('connect.sid');
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const userToReset = await User.findOne({ email });

        if (!userToReset) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
        userToReset.resetToken = resetToken;
        userToReset.resetTokenExpiry = resetTokenExpiry;
        await userToReset.save();

        const mailOptions = {
            from: mailAddress,
            to: userToReset.email,
            subject: 'Password Reset Request',
            text: `Your password reset token: ${resetToken}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Reset token email sent.');
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to send reset token email' });
        }

        res.json({ message: 'Reset token generated and sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate reset token' });
    }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
    try {
        const { email, resetToken, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.resetToken || user.resetToken !== resetToken || user.resetTokenExpiry <= Date.now()) {
            return res.status(401).json({ error: 'Invalid or expired reset token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
});




router.put('/update-my-password', async (req, res) => {
    const { email, currentPassword, newPassword, confirmPassword } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect.' });
      }
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'New password and confirm password do not match.' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      res.json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update password.' });
    }
  });

module.exports =router
