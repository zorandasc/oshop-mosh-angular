import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable, take } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object<any>('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map(
          (fireBaseShoppingCart) =>
            new ShoppingCart(fireBaseShoppingCart?.items)
        )
      );
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime(),
    });
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

  private async updateItemQuantity(product: Product, change: number) {
    //dobavi postojeci ili kreiraj novi cartid
    let cartId = await this.getOrCreateCartId();

    //dobavi itemid koji je isti kao i productid
    //item$ je AngularFireObject<ShoppingCartItem>
    let item = this.getItem(cartId, product.key);

    item
      .valueChanges() //Observable<AngularFireObject<ShoppingCartItem>>
      .pipe(take(1))
      .subscribe((shoppingCartItem) => {
        let quantity = (shoppingCartItem?.quantity || 0) + change;
        if (quantity === 0) item.remove();
        //ako postoji cartitemid povecaj quantity+1
        //ako ne postoji dodaj product i quantity=1
        //if (item) item$.update({ quantity: item.quantity + 1 });
        //else item$.set({ product: product, quantity: 1 });
        //firebase je brz pa moze (all in one go) i ovako
        else
          item.update({
            product: product,
            quantity: quantity,
          });
      });
  }
}
