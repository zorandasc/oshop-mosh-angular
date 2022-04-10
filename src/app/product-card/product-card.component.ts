import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() selectedItem = new EventEmitter<Product>();

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  imageClick() {
    this.selectedItem.emit(this.product);
  }
}
