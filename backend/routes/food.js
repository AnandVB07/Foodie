const express = require('express');
const router = express.Router();

// All 20 food items matching the frontend's assets.js
// Images reference filenames served from /images/ static route
const FOOD_LIST = [
    { _id: "1",  name: "Greek Salad",          image: "food_1.jpg",  price: 80,  description: "Food provides essential nutrients for overall health and well-being",           category: "Salad" },
    { _id: "2",  name: "Margherita Pizza",      image: "food_2.jpg",  price: 150, description: "A classic Italian pizza with fresh tomatoes, mozzarella, and basil",            category: "Pizza" },
    { _id: "3",  name: "Spaghetti Carbonara",   image: "food_3.jpg",  price: 120, description: "A creamy pasta dish with eggs, cheese, pancetta, and pepper",                  category: "Pasta" },
    { _id: "4",  name: "Grilled Chicken",       image: "food_4.jpg",  price: 180, description: "Juicy grilled chicken with herbs and a side of vegetables",                    category: "Main Course" },
    { _id: "5",  name: "Caesar Salad",          image: "food_5.jpg",  price: 70,  description: "Romaine lettuce with Caesar dressing, croutons, and parmesan cheese",          category: "Salad" },
    { _id: "6",  name: "Cheeseburger",          image: "food_6.jpg",  price: 90,  description: "Beef patty with cheese, lettuce, tomato, and sauce in a bun",                  category: "Burger" },
    { _id: "7",  name: "Vegetable Stir Fry",    image: "food_7.jpg",  price: 100, description: "Mixed vegetables stir-fried with soy sauce and garlic",                        category: "Vegetarian" },
    { _id: "8",  name: "Chocolate Cake",        image: "food_8.jpg",  price: 60,  description: "Rich and moist chocolate cake with a creamy frosting",                         category: "Dessert" },
    { _id: "9",  name: "Mango Smoothie",        image: "food_9.jpg",  price: 50,  description: "A refreshing smoothie made with fresh mangoes and yogurt",                     category: "Beverage" },
    { _id: "10", name: "Tandoori Chicken",      image: "food_10.jpg", price: 200, description: "Spicy grilled chicken marinated with yogurt and Indian spices",                category: "Main Course" },
    { _id: "11", name: "Sushi Platter",         image: "food_11.jpg", price: 250, description: "An assortment of fresh sushi with soy sauce and wasabi",                       category: "Japanese" },
    { _id: "12", name: "French Fries",          image: "food_12.jpg", price: 40,  description: "Crispy fried potato sticks served with ketchup",                               category: "Side" },
    { _id: "13", name: "Pancakes",              image: "food_13.jpg", price: 70,  description: "Fluffy pancakes served with syrup and butter",                                 category: "Breakfast" },
    { _id: "14", name: "Tomato Soup",           image: "food_14.jpg", price: 50,  description: "Creamy tomato soup with herbs and croutons",                                   category: "Soup" },
    { _id: "15", name: "Garlic Bread",          image: "food_15.jpg", price: 30,  description: "Toasted bread with garlic butter and herbs",                                   category: "Appetizer" },
    { _id: "16", name: "Parotta",               image: "food_16.jpg", price: 20,  description: "Layered and flaky South Indian bread served with curry",                       category: "Indian Bread" },
    { _id: "17", name: "Biryani",               image: "food_17.jpg", price: 150, description: "Aromatic rice dish cooked with spices, herbs, and meat",                      category: "Rice" },
    { _id: "18", name: "Chilli Chicken",        image: "food_18.jpg", price: 130, description: "Spicy Indo-Chinese chicken dish tossed with sauces and vegetables",            category: "Indo-Chinese" },
    { _id: "19", name: "Masala Dosa",           image: "food_19.jpg", price: 50,  description: "Crispy South Indian crepe stuffed with spicy potato filling",                  category: "South Indian" },
    { _id: "20", name: "Mutton Curry",          image: "food_20.jpg", price: 180, description: "Slow-cooked mutton curry in a rich and flavorful gravy",                       category: "Curry" },
];

// GET /api/food/list
router.get('/list', (req, res) => {
    res.json({ success: true, data: FOOD_LIST });
});

module.exports = router;
module.exports.FOOD_LIST = FOOD_LIST;
