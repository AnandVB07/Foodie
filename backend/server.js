const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const userRoutes = require('./routes/user');
const foodRoutes = require('./routes/food');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();
const PORT = 4000;

// ---------- Middleware ----------
app.use(cors());
app.use(express.json());

// Serve food images from the frontend assets folder
const imagesPath = path.join(__dirname, '../Project1-main/src/assets');
app.use('/images', express.static(imagesPath));

// ---------- DB bootstrap ----------
// Simple JSON file-based database
const DB_PATH = path.join(__dirname, 'db.json');

function initDB() {
    if (!fs.existsSync(DB_PATH)) {
        const seed = {
            users: [],
            carts: {},   // { userId: { itemId: quantity } }
            orders: []
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(seed, null, 2));
        console.log('✅ Database initialized at db.json');
    }
}

initDB();

// Attach DB helpers to app so routes can use them
app.locals.getDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
app.locals.saveDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// ---------- Routes ----------
app.use('/api/user', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ success: true, message: 'Foodie Backend is running 🚀' });
});

// ---------- Start ----------
app.listen(PORT, () => {
    console.log(`\n🍔 Foodie Backend running at http://localhost:${PORT}`);
    console.log(`   Images served at http://localhost:${PORT}/images/`);
});
