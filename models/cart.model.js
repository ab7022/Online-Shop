    class Cart {
        constructor(items = [], totalQuantity = 0, totalPrice = 0) {
            this.items = items;
            this.totalQuantity = totalQuantity;
            this.totalPrice = totalPrice;
        }

        addItem(product) {
            const existingItem = this.items.find(item => item.product.id === product.id);

            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.quantity * product.price;
            } else {
                const newItem = {
                    product: product,
                    quantity: 1,
                    totalPrice: product.price
                };
                this.items.push(newItem);
            }

            this.totalQuantity++;
            this.totalPrice += product.price;
        }
        // In a middleware


    }

    module.exports = Cart;
