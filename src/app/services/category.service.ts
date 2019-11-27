import {Injectable} from '@angular/core';
import {Category} from '../models/category';
import {Product} from '../models/product';
import {DocumentReference} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  currentCategory: Category;
  products: Product[];

  constructor() {
    this.currentCategory = new Category();
    this.products = [];
  }

  getCategoryName(): string {
    return this.currentCategory.name;
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  loadProducts() {
    return new Promise<void>((resolve, reject) => {
      this.products = [];
      for (const product of this.currentCategory.items) {
        product.get()
          .then(doc => {
            this.products.push(doc.data() as Product);
          });
      }
      resolve();
    });
  }

  getProducts(): Product[] {
    return this.products;
  }

}
