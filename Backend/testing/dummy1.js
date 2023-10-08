
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import your User model
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const checkAuth = require("../middleware/check-Auth")
const transporter = require("../mail/email")
const crypto = require('crypto');

const mailAddress = process.env.MAIL_USER
const mailPassword = process.env.MAIL_PASSWORD


router.post("/signup", async (req, res, next) => {
    try {
        const { companyName, firstName, lastName, email, password } = req.body;
        if (!companyName || !lastName || !firstName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const existingUser = await User.findOne({ companyName });
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
        res.status(201).json(savedUser);

    } catch (err) {
        console.error("Signup Error:", err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to signup. Please try again later.' });
    }
});

router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) { return res.status(401).json({ message: "User not Found" }) }
            else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (!result) {
                        return res.status(401).json({ message: "Password or email matching failed" })
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            password: user[0].password
                        },
                            `OriaSoftware`, { expiresIn: "24h" }
                        );
                        res.status(200).json({
                            email: user[0].email,
                            password: user[0].password,
                            token: token
                        })
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
})
router.post('/forgot-password', async (req, res) => {
    try {
        const { email, companyName } = req.body;
        const userToReset = await User.findOne({ email, companyName }); // Use a different variable name

        if (!userToReset) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

        // Update user with reset token and expiry
        userToReset.set({
            resetToken: resetToken,
            resetTokenExpiry: resetTokenExpiry
        });

        await userToReset.save();

        // Send the reset token to the user via email
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


// POST /reset-password
router.post('/reset-password', async (req, res) => {
    try {
        const { email,companyName, resetToken, newPassword } = req.body;
        const user = await User.findOne({ email,companyName });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.resetToken || user.resetToken !== resetToken || user.resetTokenExpiry <= Date.now()) {
            return res.status(401).json({ error: 'Invalid or expired reset token' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.set({
            password: hashedPassword,
            resetToken: undefined,
            resetTokenExpiry: undefined
        });
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
});



module.exports = router;