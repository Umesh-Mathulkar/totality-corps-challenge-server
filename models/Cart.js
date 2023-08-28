
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: String, 
    quantity: Number,
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
