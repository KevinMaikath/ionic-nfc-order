import {Injectable} from '@angular/core';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {

  private currentProduct: Product;

  constructor() {
    this.currentProduct = new Product();
  }

  setCurrentProduct(product: Product) {
    this.currentProduct = product;
  }

  getCurrentProduct(): Product {
    return this.currentProduct;
  }
}
