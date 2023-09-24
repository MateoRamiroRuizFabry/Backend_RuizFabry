const CartManager = require('../cartManager');

// Controlador para crear un nuevo carrito
const createCart = async (req, res) => {
    try {
      // Lógica para crear un nuevo carrito
    const cart = await CartManager.createCart();
    res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el carrito.' });
    }
  };
  
  