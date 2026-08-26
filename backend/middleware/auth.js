const jwt = require('jsonwebtoken');

const JWT_SECRET = 'foodie_secret_key_2024';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Not authorized. Please login.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Token invalid or expired.' });
    }
};

module.exports = { authMiddleware, JWT_SECRET };
