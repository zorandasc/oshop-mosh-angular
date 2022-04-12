import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Order } from '../../../shared/models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;

  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };

  user: any;
  userSubscri: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    this.userSubscri = this.authService.user$.subscribe(
      (user) => (this.user = user)
    );
  }

  async placeOrder() {
    let user = {
      userId: this.user.uid,
      name: this.user.displayName,
    };
    let order = new Order(user, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy(): void {
    this.userSubscri.unsubscribe();
  }
}
