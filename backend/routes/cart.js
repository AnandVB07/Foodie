const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// POST /api/cart/add  (protected)
router.post('/add', authMiddleware, (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.userId;

        const db = req.app.locals.getDB();
        if (!db.carts[userId]) {
            db.carts[userId] = {};
        }

        db.carts[userId][itemId] = (db.carts[userId][itemId] || 0) + 1;
        req.app.locals.saveDB(db);

        res.json({ success: true, message: 'Item added to cart', cartData: db.carts[userId] });
    } catch (error) {
        console.error('Cart add error:', error);
        res.json({ success: false, message: 'Error adding to cart' });
    }
});

// POST /api/cart/remove  (protected)
router.post('/remove', authMiddleware, (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.userId;

        const db = req.app.locals.getDB();
        if (!db.carts[userId] || !db.carts[userId][itemId]) {
            return res.json({ success: false, message: 'Item not in cart' });
        }

        db.carts[userId][itemId] -= 1;
        if (db.carts[userId][itemId] <= 0) {
            delete db.carts[userId][itemId];
        }

        req.app.locals.saveDB(db);
        res.json({ success: true, message: 'Item removed from cart', cartData: db.carts[userId] });
    } catch (error) {
        console.error('Cart remove error:', error);
        res.json({ success: false, message: 'Error removing from cart' });
    }
});

// POST /api/cart/get  (protected)
router.post('/get', authMiddleware, (req, res) => {
    try {
        const userId = req.userId;
        const db = req.app.locals.getDB();
        const cartData = db.carts[userId] || {};

        res.json({ success: true, cartData });
    } catch (error) {
        console.error('Cart get error:', error);
        res.json({ success: false, message: 'Error fetching cart' });
    }
});

module.exports = router;
