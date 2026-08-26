const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// POST /api/order/place  (protected)
router.post('/place', authMiddleware, (req, res) => {
    try {
        const { address, items, amount } = req.body;
        const userId = req.userId;

        if (!items || items.length === 0) {
            return res.json({ success: false, message: 'Cart is empty' });
        }

        const db = req.app.locals.getDB();

        const orderId = uuidv4();
        const newOrder = {
            id: orderId,
            userId,
            address,
            items,
            amount,
            status: 'Pending Payment',
            payment: false,
            createdAt: new Date().toISOString()
        };

        db.orders.push(newOrder);

        // Clear user's cart after placing order
        db.carts[userId] = {};

        req.app.locals.saveDB(db);

        // Return a verify URL (simulated payment — no Stripe needed)
        // Frontend redirects here, then we redirect back to /verify
        const session_url = `http://localhost:3000/verify?success=true&orderId=${orderId}`;

        res.json({
            success: true,
            message: 'Order placed successfully',
            session_url,
            orderId
        });
    } catch (error) {
        console.error('Order place error:', error);
        res.json({ success: false, message: 'Error placing order' });
    }
});

// POST /api/order/verify
router.post('/verify', (req, res) => {
    try {
        const { success, orderId } = req.body;
        const db = req.app.locals.getDB();

        const orderIndex = db.orders.findIndex(o => o.id === orderId);
        if (orderIndex === -1) {
            return res.json({ success: false, message: 'Order not found' });
        }

        if (success === 'true' || success === true) {
            db.orders[orderIndex].payment = true;
            db.orders[orderIndex].status = 'Food Processing';
            req.app.locals.saveDB(db);
            res.json({ success: true, message: 'Payment verified' });
        } else {
            // Payment failed — remove the order
            db.orders.splice(orderIndex, 1);
            req.app.locals.saveDB(db);
            res.json({ success: false, message: 'Payment failed, order cancelled' });
        }
    } catch (error) {
        console.error('Order verify error:', error);
        res.json({ success: false, message: 'Error verifying order' });
    }
});

// POST /api/order/userorders  (protected) — get all orders for logged-in user
router.post('/userorders', authMiddleware, (req, res) => {
    try {
        const userId = req.userId;
        const db = req.app.locals.getDB();

        const userOrders = db.orders.filter(o => o.userId === userId && o.payment === true);

        res.json({ success: true, data: userOrders });
    } catch (error) {
        console.error('User orders error:', error);
        res.json({ success: false, message: 'Error fetching orders' });
    }
});

module.exports = router;
