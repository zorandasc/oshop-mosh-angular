import { Component, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shoppig-cart-summary',
  templateUrl: './shoppig-cart-summary.component.html',
  styleUrls: ['./shoppig-cart-summary.component.css']
})
export class ShoppigCartSummaryComponent  {
  @Input('cart') cart:ShoppingCart;

  constructor() { }

 

}
