import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { retry, take } from 'rxjs';
import { Product } from '../models/product';
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

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object<ShoppingCartItem>(
      '/shopping-carts/' + cartId + '/items/' + productId
    );
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    //dobavi postojeci ili kreiraj novi cartid
    let cartId = await this.getOrCreateCartId();

    //dobavi caritemid koji je isti kao i productid
    let item$ = this.getItem(cartId, product.key);

    //da bi smo doboli nas objekat ShoppingCartItem
    //moram se subscribovati na AngularFireObject<ShoppingCartItem>
    //odnosno na Observable of AngularFireObject, which is
    //item$.valueChanges()
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item) => {
        //ako postoji cartitemid povecaj quantity+1
        //ako ne postoji dodaj product i quantity=1
        //if (item) item$.update({ quantity: item.quantity + 1 });
        //else item$.set({ ptoduct:product, quantity:  1 });
        //firebase je brz pa moze all in one go i ovako
        item$.update({
          product: product,
          quantity: (item.quantity || 0) + 1,
        });
      });
  }
}
