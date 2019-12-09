import {Injectable} from '@angular/core';
import {ShopItem} from '../models/shop-item';
import {AngularFirestore} from '@angular/fire/firestore';

/**
 * Handles the data need for ShoppingCartPage.
 * Handles the items in the shopping cart and sets the order to firebase.
 */
@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  /** Items in the shopping cart */
  cart: ShopItem[];

  /** Total price of the shopping cart */
  totalPrice;

  /** Dependency injector and variable initialization */
  constructor(private firebase: AngularFirestore) {
    this.cart = [];
    this.totalPrice = 0;
  }

  /** Returns the items in the shopping cart */
  getShoppingCart() {
    return this.cart;
  }

  /** Returns the total price of the shopping cart */
  getTotalPrice() {
    return this.totalPrice;
  }

  /**
   *  Adds a new item to the shopping cart.
   *  If the item is already existing in the cart, it only increases its quantity by one.
   * @param item Product to be added to the shopping cart
   */
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

  /**
   * Increases the quantity of an existing item in the shopping cart by one.
   * @param item Product to be increased
   */
  addOneToItemCount(item: ShopItem) {
    const index = this.cart.indexOf(item);
    this.cart[index].count += 1;
    this.totalPrice += item.price;
  }

  /**
   *  Decreases the quantity of an existing item in the shopping cart by one.
   *  If the result of the items quantity is zero, it removes the item from the cart.
   * @param item Product to be decreased
   */
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

  /**
   * Removes an existing item from the shopping cart.
   * @param index Index of the item to be removed in the cart
   */
  removeFromShoppingCart(index: number) {
    this.cart.splice(index, 1);
  }

  /**
   *  Creates a new order with the data from the shopping cart and uploads it to firebase.
   * @param docRef URL of the Firestore document where the order will be written
   */
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
