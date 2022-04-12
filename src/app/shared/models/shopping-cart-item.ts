import { Product } from './product';

export class ShoppingCartItem {
  key?: string;
  product: Product;
  quantity: number;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  get totalPrice() {
    return this.product.price * this.quantity;
  }
}
