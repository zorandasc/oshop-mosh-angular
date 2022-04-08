import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { take } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime(),
    });
  }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object<ShoppingCart>('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object<ShoppingCartItem>(
      '/shopping-carts/' + cartId + '/items/' + productId
    );
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    //dobavi postojeci ili kreiraj novi cartid
    let cartId = await this.getOrCreateCartId();

    //dobavi caritemid koji je isti kao i productid
    //item$ je AngularFireObject<ShoppingCartItem>
    let item$ = this.getItem(cartId, product.key);
    item$
      .valueChanges() //Observable<AngularFireObject<ShoppingCartItem>>
      .pipe(take(1))
      .subscribe((shoppingCartItem) => {
        //ako postoji cartitemid povecaj quantity+1
        //ako ne postoji dodaj product i quantity=1
        //if (item) item$.update({ quantity: item.quantity + 1 });
        //else item$.set({ product: product, quantity: 1 });
        //firebase je brz pa moze (all in one go) i ovako
        item$.update({
          product: product,
          quantity: (shoppingCartItem?.quantity || 0) + change,
        });
      });
  }
}
