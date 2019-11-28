import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ShoppingService} from '../../services/shopping.service';
import {ShopItem} from '../../models/shop-item';
import {ToastController} from '@ionic/angular';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {Subscription} from 'rxjs';
import {ItemDetailService} from '../../services/item-detail.service';
import {Product} from '../../models/product';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit, OnDestroy {

  product: Product;
  landscape: boolean;
  orientationListener: Subscription;

  constructor(private itemDetailService: ItemDetailService,
              private router: Router,
              private shoppingService: ShoppingService,
              private toastCtrl: ToastController,
              private screenOrientation: ScreenOrientation,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    // Check current orientation
    this.landscape = this.screenOrientation.type.startsWith('landscape');

    // Get the product from the service
    this.product = this.itemDetailService.getCurrentProduct();

    // Listen for orientation changes
    this.orientationListener = this.screenOrientation.onChange()
      .subscribe(() => {
        this.landscape = !this.landscape;
        this.changeDetectorRef.detectChanges();
      });
  }

  /**
   * Stop listening to orientation changes
   */
  ngOnDestroy() {
    this.orientationListener.unsubscribe();
  }

  /**
   * Tell the shopping.service to add one to the item count
   */
  addOneToItemCount(item: Product) {
    const shopItem = new ShopItem();
    shopItem.name = item.name;
    shopItem.price = item.price;
    this.shoppingService.addItemToShoppingCart(shopItem);
    this.notifyItemAdded(item.name);
  }

  /**
   * Present a toast to notify when we add one to the item count
   */
  async notifyItemAdded(itemName: string) {
    const toast = await this.toastCtrl.create({
      message: `${itemName} added to the cart!`,
      duration: 2000,
      color: 'medium'
    });
    await toast.present();
  }

}
