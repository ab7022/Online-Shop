const Product = require("../models/product.model");

class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice = existingItem.quantity * product.price;
    } else {
      const newItem = {
        product: product,
        quantity: 1,
        totalPrice: product.price,
      };
      this.items.push(newItem);
    }

    this.calculateCartTotal();
  }

  updateItem(productid, newQuantity) {
    let updatedItemPrice = 0;

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.product.id === productid) {
        if (newQuantity > 0) {
          const quantityChange = newQuantity - item.quantity;
          item.quantity = newQuantity;
          item.totalPrice = newQuantity * item.product.price;
          updatedItemPrice = item.totalPrice;
        } else if (newQuantity <= 0) {
          this.totalQuantity -= item.quantity;
          this.totalPrice -= item.totalPrice;
          this.items.splice(i, 1);
          updatedItemPrice = 0;
        }
      }
    }

    this.calculateCartTotal();

    return { updatedItemPrice };
  }

  calculateCartTotal() {
    this.totalPrice = this.items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    this.totalQuantity = this.items.reduce(
      (total, item) => total + parseInt(item.quantity, 10),
      0
    );
  }
  async updatePrices() {
    const productIds = this.items.map(function (item) {
      return item.product.id;
    });
    const products = await Product.findMultiple(productIds);

    const deletableCartItemProductIds = [];

    for (const cartItem of this.items) {
      const product = products.find(function (prod) {
        return prod.id === cartItem.product.id;
      });

      if (!product) {
        deletableCartItemProductIds.push(cartItem.product.id);
        continue;
      }
      cartItem.product = product;
      cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
    }
    if (deletableCartItemProductIds.length > 0) {
      this.items = this.items.filter(function (item) {
        return deletableCartItemProductIds.indexOf(item.product.id) < 0;
      });
    }
    this.totalQuantity = 0;
    this.totalPrice = 0;

    for (const item of this.items) {
      this.totalQuantity = this.totalQuantity + item.quantity;
      this.totalPrice = this.totalPrice + item.totalPrice;
    }
  }
}

module.exports = Cart;
