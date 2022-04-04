import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categorySubs: Subscription;
  product: Product = {
    key: '',
    title: '',
    price: 0,
    category: '',
    imageUrl: '',
  };
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService
        .get(this.id)
        .valueChanges()
        .pipe(take(1))
        .subscribe((p) => (this.product = p));
    }

    this.categorySubs = this.categoryService
      .getCategories()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => (this.categories = data));
  }

  ngOnInit(): void {}

  save(product: any) {
    if (this.id) {
      this.productService.update(this.id, product).then(() => {
        console.log('Item updatet successfully!');
        this.router.navigate(['/admin/products']);
      });
    } else {
      this.productService.create(product).then(() => {
        console.log('Created new item successfully!');
        this.router.navigate(['/admin/products']);
      });
    }
  }

  delete() {
    if (!confirm('Are sure you want to delete product?')) return;
    this.productService.delete(this.id).then(() => {
      console.log('Item DELETED successfully!');
      this.router.navigate(['/admin/products']);
    });
  }

  ngOnDestroy(): void {
    this.categorySubs.unsubscribe();
  }
}
