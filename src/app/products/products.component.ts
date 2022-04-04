import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnDestroy {
  products: Product[];
  productSubsc: Subscription;

  constructor(private productService: ProductService) {
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
      .subscribe((data) => (this.products = data));
  }

  ngOnDestroy(): void {
    this.productSubsc.unsubscribe();
   
  }
}
