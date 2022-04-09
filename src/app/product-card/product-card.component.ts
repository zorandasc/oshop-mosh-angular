import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {}
  
  ngOnInit(): void {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product)
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;

    //itemsMap je objekat oblika { [productId: string]: ShoppingCartItem }
    //ono sto dobijemo od firebasea
    let item = this.shoppingCart.items[<any>this.product.key];

    return item ? item.quantity : 0;
  }
}
