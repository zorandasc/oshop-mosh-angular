import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
})
export class OrderItemComponent implements OnInit {
  order: Order = {
    datePlaced: 0,
    items: [],
    shipping: {},
    user: {},
  };
  totalPrice: number;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.orderService
        .get(this.id)
        .pipe(take(1))//take unsubrcibe
        .subscribe((order) => {
          this.order = order;
          this.calculateTotalPrice();
        });
    }
  }

  private calculateTotalPrice() {
    let sum = 0;
    for (let productId in this.order.items) {
      sum += this.order.items[productId].totalPrice;
    }
    this.totalPrice = sum;
  }

  backClicked() {
    this._location.back();
  }
}
