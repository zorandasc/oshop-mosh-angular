import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  public items: ShoppingCartItem[] = []; //ovaj je nas lokalni array za nase potrebe

  //mi od firbase dobijamo items koji je obkekat
  //ovog tipa { [key: string]: ShoppingCartItem }
  //in shoppin-cartservice  new ShoppingCart(fireBaseShoppingCart.items)
  //i smijestamo ga u itemsMap
  constructor(private itemsMap: { [key: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};
    
    for (let productId in itemsMap) {
      //mapiramo u nas lokalnu array
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }
  /*
  ovo je prije nego sto smo stvorili nas lokalni items array
  get productIds() {
    //dobavi kljuceve iz items objekta
    return Object.keys(this.items);
  }
*/
  //single responsability principel
  //Shopingcart treba da zna count
  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items) count += this.items[productId].quantity;
    return count;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.key];

    return item ? item.quantity : 0;
  }
}
