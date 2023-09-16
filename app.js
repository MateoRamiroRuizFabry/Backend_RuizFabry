const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000; 

const manager = new ProductManager('productos.json');

// Endpoint para obtener todos los productos o un número limitado de productos
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await manager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  if (isNaN(productId)) {
    return res.status(400).json({ error: 'ID de producto no válido.' });
  }

  try {
    const product = await manager.getProductById(productId);
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado.' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
