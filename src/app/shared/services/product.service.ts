import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: Product) {
    return this.db.list('/products').push(product);
  }

  getAll(): AngularFireList<Product> {
    return this.db.list('/products', (ref) => ref.orderByChild('title'));
  }

  get(productId: string): AngularFireObject<Product> {
    return this.db.object<Product>('/products/' + productId);
  }

  update(productId: string, product: Product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
