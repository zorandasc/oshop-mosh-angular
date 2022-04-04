import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories(): AngularFireList<Category> {
    return this.db.list('/categories', (ref) => {
      return ref.orderByChild('name');
    });
  }
}
