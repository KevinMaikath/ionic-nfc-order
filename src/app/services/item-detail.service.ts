import {Injectable} from '@angular/core';
import {Product} from '../models/product';

/**
 *  Handles the data needed for ItemDetailPage.
 */
@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {

  /** Product that has been previously selected */
  private currentProduct: Product;

  /** Variable initialization. */
  constructor() {
    this.currentProduct = new Product();
  }

  /**
   *  Sets the current product.
   * @param product New product
   */
  setCurrentProduct(product: Product) {
    this.currentProduct = product;
  }

  /** Returns the "currentProduct" */
  getCurrentProduct(): Product {
    return this.currentProduct;
  }
}
