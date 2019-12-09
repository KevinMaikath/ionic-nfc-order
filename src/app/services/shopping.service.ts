import {Injectable} from '@angular/core';
import {ShopItem} from '../models/shop-item';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  cart: ShopItem[];
  totalPrice;

  constructor(private firebase: AngularFirestore) {
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
      this.totalPrice += item.price;
    }
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
    this.cart.splice(index, 1);
  }

  setOrder(docRef: string) {
    const elements: {
      name: string,
      quantity: number
    }[] = [];

    for (const el of this.cart) {
      elements.push({
        name: el.name,
        quantity: el.count
      });
    }

    return this.firebase.collection('orders').doc(docRef).set({
      totalPrice: this.totalPrice,
      elements
    });
  }

}
