import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogService} from '../../services/catalog.service';
import {CategoryItem} from '../../models/category-item';
import {ShoppingService} from '../../services/shopping.service';
import {ShopItem} from '../../models/shop-item';
import {ToastController} from '@ionic/angular';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit, OnDestroy {

  categoryItem: CategoryItem;
  landscape: boolean;
  orientationListener: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private catalogService: CatalogService,
              private router: Router,
              private shoppingService: ShoppingService,
              private toastCtrl: ToastController,
              private screenOrientation: ScreenOrientation,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    // Check current orientation
    this.landscape = this.screenOrientation.type === 'landscape-secondary';

    // Get URL parameters: item to load
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('itemDocRef')) {
        this.router.navigate(['/catalog']);
        return;
      }
      const itemDocumentRef = paramMap.get('itemDocRef');

      // Load the item from firebase
      this.categoryItem = new CategoryItem();
      this.catalogService.getItem(itemDocumentRef)
        .get()
        .subscribe(documentSnapshot => {
          const data = documentSnapshot.data();
          this.categoryItem.name = data.name;
          this.categoryItem.imgUrl = data.imgUrl;
          this.categoryItem.price = data.price;
          this.categoryItem.ingredients = data.ingredients;
        });
    });


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
  addOneToItemCount(item: CategoryItem) {
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
