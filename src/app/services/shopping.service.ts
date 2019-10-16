import {Injectable} from '@angular/core';
import {ShopItem} from '../models/shop-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  cart: ShopItem[];

  constructor() {
    // this.cart = [];
  }

  getShoppingCart() {
    return this.cart;
  }

  addItemToShoppingCart(item: ShopItem) {
    if (this.cart.includes(item)) {
      this.addOneToItemCount(item);
    } else {
      this.cart.push(item);
    }
  }

  addOneToItemCount(item: ShopItem) {
    const index = this.cart.indexOf(item);
    this.cart[index].count += 1;
  }

  removeOneFromItemCount(item: ShopItem) {
    const index = this.cart.indexOf(item);
    if (index !== -1) {
      if (this.cart[index].count > 1) {
        this.cart[index].count -= 1;
      } else {
        this.removeFromShoppingCart(index);
      }
    }
  }

  removeFromShoppingCart(index: number) {
    this.cart.splice(index);
  }

}
