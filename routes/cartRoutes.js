// routes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

router.post('/add', cartController.addToCart);
router.put('/update', cartController.updateQuantity);
router.delete('/remove', cartController.removeFromCart);
router.post('/fetch', cartController.fetchCart);

module.exports = router;
