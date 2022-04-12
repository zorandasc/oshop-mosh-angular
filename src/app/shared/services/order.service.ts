import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Order } from '../models/order';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order: Order) {
    //ovdije navodno treba transaction
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db
      .list<AngularFireList<Order>>('/orders')
      .snapshotChanges()
      .pipe(
        //pajpujemo da bi dobili i kljuceve svakog ordera
        map((changes) =>
          changes.map((c) => {
            return { key: c.payload.key, ...c.payload.val() };
          })
        )
      );
  }

  getOrdersByUser(userId: string) {
    return this.db
      .list<Order[]>('/orders', (ref) =>
        ref.orderByChild('user/userId').equalTo(userId)
      )
      .snapshotChanges()
      .pipe(
        //pajpujemo da bi dobili i kljuceve svakog ordera
        map((changes) =>
          changes.map((c) => {
            return { key: c.payload.key, ...c.payload.val() };
          })
        )
      );
  }

  get(orderId: string) {
    return this.db
      .object<Order>('/orders/' + orderId)
      .valueChanges();
  }
}
