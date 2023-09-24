const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
    this.nextProductId = 1;

    // Cargar productos desde el archivo al iniciar
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      this.products = JSON.parse(data);
      if (!Array.isArray(this.products)) {
        this.products = [];
      } else {
        // Encontrar el próximo id disponible
        const maxId = this.products.reduce(
          (max, product) => (product.id > max ? product.id : max),
          0
        );
        this.nextProductId = maxId + 1;
      }
    } catch (error) {
      this.products = [];
    }
  }

  async saveProducts() {
    await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
  }

  async addProduct(product) {
    product.id = this.nextProductId++;
    this.products.push(product);
    await this.saveProducts();
  }

  async getProducts(limit) {
    this.loadProducts();
    if (typeof limit === 'number' && limit > 0) {
      return this.products.slice(0, limit);
    }
    return this.products;
  }

  async getProductById(id) {
    this.loadProducts();
    const product = this.products.find((p) => p.id === id);
    return product;
  }

  async updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      // Actualizar el producto
      this.products[index] = { ...this.products[index], ...updatedProduct };
      await this.saveProducts();
      return true;
    }
    return false;
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      // Eliminar el producto por su índice
      this.products.splice(index, 1);
      await this.saveProducts();
      return true;
    }
    return false;
  }
}

module.exports = ProductManager;