import {Injectable} from '@angular/core';
import {ShopItem} from '../models/shop-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  cart: ShopItem[];
  totalPrice;

  constructor() {
    this.cart = [];
    this.totalPrice = 0;
  }

  getShoppingCart() {
    return this.cart;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  addItemToShoppingCart(item: ShopItem) {
    const existingItem = this.cart.find(element => {
      return element.name === item.name;
    });

    if (existingItem !== undefined) {
      this.addOneToItemCount(existingItem);
    } else {
      const newItem = new ShopItem();
      newItem.name = item.name;
      newItem.price = item.price;
      newItem.count = 1;
      this.cart.push(newItem);
    }
    this.totalPrice += item.price;
  }

  addOneToItemCount(item: ShopItem) {
    const index = this.cart.indexOf(item);
    this.cart[index].count += 1;
    this.totalPrice += item.price;
  }

  removeOneFromItemCount(item: ShopItem) {
    const index = this.cart.indexOf(item);
    if (index !== -1) {
      if (this.cart[index].count > 1) {
        this.cart[index].count -= 1;
      } else {
        this.removeFromShoppingCart(index);
      }
      this.totalPrice -= item.price;
    }
  }

  removeFromShoppingCart(index: number) {
    if (index === 0) {
      this.cart.shift();
    } else {
      this.cart.splice(index);
    }
  }

}
