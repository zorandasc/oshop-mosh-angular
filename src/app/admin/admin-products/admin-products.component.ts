import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  productSubsc: Subscription;
  //filteredProducts: Product[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<void | any>();

  constructor(private productService: ProductService) {
    this.productSubsc = this.productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            this.dtTrigger.next(null);
            return { key: c.payload.key, ...c.payload.val() };
          })
        )
      )
      ///.subscribe((data) => (this.filteredProducts = this.products = data));
      .subscribe((data) => {
        console.log(data);
        this.products = data;
      });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      retrieve: true,
    };
  }
  /*
  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }
*/
  ngOnDestroy(): void {
    this.productSubsc.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
}
