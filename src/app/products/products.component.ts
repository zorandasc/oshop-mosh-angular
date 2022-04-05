import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';

import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnDestroy {
  products: Product[] = [];
  productSubsc: Subscription;
  filteredProducts: Product[] = [];
  category: string;

  constructor(route: ActivatedRoute, private productService: ProductService) {
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
          return route.queryParamMap; //return Observable<ParamMap>
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });
  }

  ngOnDestroy(): void {
    this.productSubsc.unsubscribe();
  }
}
