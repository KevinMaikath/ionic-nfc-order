import {Injectable} from '@angular/core';
import {Category} from '../models/category';
import {Product} from '../models/product';

/**
 *  Handles the data needed for CategoryPage.
 *  Loads data from firebase.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  /** Category that has been previously selected */
  currentCategory: Category;

  /** List of products of the current category */
  products: Product[];

  /** Dependency injector. */
  constructor() {
    this.currentCategory = new Category();
    this.products = [];
  }

  /** Returns the name of the current category. */
  getCategoryName(): string {
    return this.currentCategory.name;
  }

  /**
   *  Sets the current category.
   * @param category Selected category
   */
  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  /**
   * Loads the product list from firebase and stores it in the "products" variable.
   * @returns Resolves when the data has been loaded
   */
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

  /** Returns the "products" list. */
  getProducts(): Product[] {
    return this.products;
  }

}
