const fs = require('fs').promises;

class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.carts = [];
    this.nextCartId = 1;

    // Cargar carritos desde el archivo al iniciar
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      this.carts = JSON.parse(data);
      if (!Array.isArray(this.carts)) {
        this.carts = [];
      } else {
        // Encontrar el próximo id disponible
        const maxId = this.carts.reduce(
          (max, cart) => (cart.id > max ? cart.id : max),
          0
        );
        this.nextCartId = maxId + 1;
      }
    } catch (error) {
      this.carts = [];
    }
  }

  async saveCarts() {
    await fs.writeFile(this.filePath, JSON.stringify(this.carts, null, 2), 'utf8');
  }

  async createCart() {
    const cart = {
      id: this.nextCartId++,
      products: [] // Inicialmente, el carrito está vacío
    };
    this.carts.push(cart);
    await this.saveCarts();
    return cart;
  }

  async getCartById(id) {
    this.loadCarts();
    const cart = this.carts.find((c) => c.id === id);
    return cart;
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const cart = await this.getCartById(cartId);
    if (cart) {
      // Buscar el producto en el carrito
      const productIndex = cart.products.findIndex((p) => p.productId === productId);

      if (productIndex !== -1) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        cart.products[productIndex].quantity += quantity;
      } else {
        // Si el producto no está en el carrito, agregarlo
        cart.products.push({ productId, quantity });
      }

      await this.saveCarts();
      return true;
    }
    return false;
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    if (cart) {
      // Filtrar los productos que no coincidan con el productId
      cart.products = cart.products.filter((p) => p.productId !== productId);

      await this.saveCarts();
      return true;
    }
    return false;
  }
}

module.exports = CartManager;
