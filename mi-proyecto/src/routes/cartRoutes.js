const express = require('express');
const router = express.Router();

// Controladores de carritos
const {
  createCart,
  getCartById,
  addProductToCart,
} = require('../controllers/cartController');

// Rutas de carritos
router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);

module.exports = router;
