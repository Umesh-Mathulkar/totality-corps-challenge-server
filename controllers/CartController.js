// controllers/cartController.js
const axios = require('axios');
const CartItem = require('../models/Cart');
const User = require('../models/User');


exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Fetch product information from the external product API
        const productResponse = await axios.get(`https://fakestoreapi.com/products/${productId}`);

        if (productResponse.status !== 200) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        const product = productResponse.data;

        // Check if cart item already exists for the user and product
        let cartItem = await CartItem.findOne({ userId, productId });

        if (cartItem) {
            // Update quantity
            cartItem.quantity += quantity;
        } else {
            console.log(productId)
            cartItem = new CartItem({ userId, productId, quantity });
        }

        await cartItem.save();
        res.status(200).json({ message: 'Product added to cart successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

exports.updateQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cartItem = await CartItem.findOne({ userId, productId });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ message: 'Cart item quantity updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cartItem = await CartItem.findOneAndRemove({ userId, productId });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }

        res.status(200).json({ message: 'Cart item removed successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};



exports.fetchCart = async (req, res) => {
    try {
        const { userId } = req.body;
        
        const cartItems = await CartItem.find({ userId });

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};
