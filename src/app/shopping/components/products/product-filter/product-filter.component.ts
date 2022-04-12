import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnDestroy {
  categories: Category[] = [];
  categorySubs: Subscription;
  @Input('category') category:string;

  constructor(private categoryService: CategoryService) {
    //get all categories
    this.categorySubs = this.categoryService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => (this.categories = data));
  }

  ngOnDestroy(): void {
    this.categorySubs.unsubscribe();
  }
}
