import {Component, OnInit} from '@angular/core';
import {ShopItem} from '../../models/shop-item';
import {ShoppingService} from '../../services/shopping.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  shoppingCart: ShopItem[];
  totalPrice: number;

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit() {
    this.resetShoppingCart();
  }

  addOneToItemCount(item: ShopItem) {
    this.shoppingService.addOneToItemCount(item);
    this.resetShoppingCart();
  }

  removeOneFromItemCount(item: ShopItem) {
    this.shoppingService.removeOneFromItemCount(item);
    this.resetShoppingCart();
  }

  resetShoppingCart() {
    this.shoppingCart = this.shoppingService.getShoppingCart();
    this.totalPrice = this.shoppingService.getTotalPrice();
  }

}
