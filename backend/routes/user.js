const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// Validation helper
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// POST /api/user/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'All fields are required.' });
        }
        if (!validateEmail(email)) {
            return res.json({ success: false, message: 'Invalid email address.' });
        }
        if (password.length < 6) {
            return res.json({ success: false, message: 'Password must be at least 6 characters.' });
        }

        const db = req.app.locals.getDB();

        // Check if email already exists
        const existingUser = db.users.find(u => u.email === email.toLowerCase());
        if (existingUser) {
            return res.json({ success: false, message: 'Email already registered. Please login.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            id: uuidv4(),
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        db.users.push(newUser);
        req.app.locals.saveDB(db);

        // Generate JWT
        const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            message: 'Account created successfully!',
            token,
            userId: newUser.id,
            name: newUser.name
        });
    } catch (error) {
        console.error('Register error:', error);
        res.json({ success: false, message: 'Server error. Please try again.' });
    }
});

// POST /api/user/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: 'Email and password are required.' });
        }

        const db = req.app.locals.getDB();
        const user = db.users.find(u => u.email === email.toLowerCase());

        if (!user) {
            return res.json({ success: false, message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid email or password.' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            message: 'Login successful!',
            token,
            userId: user.id,
            name: user.name
        });
    } catch (error) {
        console.error('Login error:', error);
        res.json({ success: false, message: 'Server error. Please try again.' });
    }
});

module.exports = router;
