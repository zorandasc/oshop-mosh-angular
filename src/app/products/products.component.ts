import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, switchMap } from 'rxjs';

import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productSubsc: Subscription;
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    //get all products
    this.productSubsc = this.productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return { key: c.payload.key, ...c.payload.val() };
          })
        )
      )
      //da nebi imali subscribe unutar subcsribe
      //koristiom switchMap, switch from one observble to another
      .pipe(
        switchMap((data) => {
          this.products = data;
          console.log(this.products);
          //route params dobijamo od router u komponentu
          return this.route.queryParamMap; //return Observable<ParamMap>
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });

    //dobavi cart od cart observera i ubaci u svaku karticu
    //svaka kartica ce naci sebe u itemsima carta
    //preko product.key
    this.cart$ = await this.cartService.getCart();
  }

  ngOnDestroy(): void {
    this.productSubsc.unsubscribe();
  }
}
