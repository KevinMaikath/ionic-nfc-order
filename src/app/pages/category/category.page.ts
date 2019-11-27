import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ShoppingService} from '../../services/shopping.service';
import {ShopItem} from '../../models/shop-item';
import {ToastController} from '@ionic/angular';
import {Product} from '../../models/product';
import {CategoryService} from '../../services/category.service';
import {ItemDetailService} from '../../services/item-detail.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  categoryName: string;
  products: Product[];

  constructor(private categoryService: CategoryService,
              private itemDetailService: ItemDetailService,
              private router: Router,
              private shoppingService: ShoppingService,
              private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.categoryName = this.categoryService.getCategoryName();
    this.categoryService.loadProducts()
      .then(() => {
        this.products = this.categoryService.getProducts();
      });
  }

  addOneToItemCount(item: Product) {
    const shopItem = new ShopItem();
    shopItem.name = item.name;
    shopItem.price = item.price;
    this.shoppingService.addItemToShoppingCart(shopItem);
    this.notifyItemAdded(item.name);
  }

  goToItemDetail(item: Product) {
    this.itemDetailService.setCurrentProduct(item);
    this.router.navigate(['/item-detail']);
  }

  async notifyItemAdded(itemName: string) {
    const toast = await this.toastCtrl.create({
      message: `${itemName} added to the cart!`,
      duration: 2000,
      color: 'medium',
    });
    await toast.present();
  }

}
