const ProductManager = require('../ProductManager');

// Controlador para obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
      // Lógica para obtener todos los productos
    const products = await ProductManager.getProducts();
    res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos.' });
    }
  };
  
  
  