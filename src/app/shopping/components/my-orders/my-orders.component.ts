import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<any>;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orders$ = this.authService.user$.pipe(
      switchMap((u) => this.orderService.getOrdersByUser(u.uid))
    );
  }
}
