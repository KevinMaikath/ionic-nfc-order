import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ShoppingService} from '../../services/shopping.service';
import {ShopItem} from '../../models/shop-item';
import {ToastController} from '@ionic/angular';
import {Product} from '../../models/product';
import {CategoryService} from '../../services/category.service';
import {ItemDetailService} from '../../services/item-detail.service';

/**
 * Displays a list of products, depending on the previously selected category
 */
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  /** Name of the category to be displayed */
  categoryName: string;

  /** List of products to be displayed */
  products: Product[];

  /** Dependency injector. */
  constructor(private categoryService: CategoryService,
              private itemDetailService: ItemDetailService,
              private router: Router,
              private shoppingService: ShoppingService,
              private toastCtrl: ToastController) {
  }

  /**
   * Tells the CategoryService to load all the products needed, and assigns them to the "products" variable when loaded.
   */
  ngOnInit() {
    this.categoryName = this.categoryService.getCategoryName();
    this.categoryService.loadProducts()
      .then(() => {
        this.products = this.categoryService.getProducts();
      });
  }

  /**
   *  Tells the ShoppingService to add one unit of the selected product.
   * @param item Selected product
   */
  addOneToItemCount(item: Product) {
    const shopItem = new ShopItem();
    shopItem.name = item.name;
    shopItem.price = item.price;
    this.shoppingService.addItemToShoppingCart(shopItem);
    this.notifyItemAdded(item.name);
  }

  /**
   *  Navigates to ItemDetailPage, passing the selected product trough the ItemDetailService.
   * @param item Selected product
   */
  goToItemDetail(item: Product) {
    this.itemDetailService.setCurrentProduct(item);
    this.router.navigate(['/tabs/catalog/item-detail']);
  }

  /**
   *  Presents a toast notifying that a product was added to the shopping cart.
   * @param itemName Name of the product
   */
  async notifyItemAdded(itemName: string) {
    const toast = await this.toastCtrl.create({
      message: `${itemName} added to the cart!`,
      duration: 2000,
      color: 'medium',
    });
    await toast.present();
  }

}
