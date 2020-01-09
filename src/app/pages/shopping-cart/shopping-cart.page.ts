import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopItem, ShopMenuItem} from '../../models/shop-item';
import {ShoppingService} from '../../services/shopping.service';
import {LoadingController, AlertController} from '@ionic/angular';
import {NFC, NdefEvent} from '@ionic-native/nfc/ngx';
import {Observable, Subscription} from 'rxjs';

/**
 * Shows a list of the products in the shopping cart and handles the NFC tag reading.
 */
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit, OnDestroy {

  shoppingCartItems: ShopItem[];
  shoppingCartMenus: ShopMenuItem[];
  totalPrice: number;

  loading: HTMLIonLoadingElement;
  listenAlert: HTMLIonAlertElement;

  existingObservable = false;
  ndefEventObservable: Observable<NdefEvent>;
  nfcSubscription: Subscription;

  /** Dependency injector. */
  constructor(private shoppingService: ShoppingService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private nfc: NFC) {
  }

  /**
   * Initiates the product list and total price.
   */
  ngOnInit() {
    this.resetShoppingCart();
  }

  /**
   *  Unsubscribe from the NFC observer if it exists.
   */
  ngOnDestroy() {
    if (this.nfcSubscription != null) {
      this.nfcSubscription.unsubscribe();
    }
  }

  /**
   *  Tells the ShoppingService to increase the quantity of an existing product in the shopping cart by one.
   * @param item Selected product
   */
  addOneToItemCount(item: ShopItem) {
    this.shoppingService.addOneToItemCount(item);
    this.resetShoppingCart();
  }

  /**
   *  Tells the ShoppingService to decrease the quantity of an existing product in the shopping cart by one.
   * @param item Selected product
   */
  removeOneFromItemCount(item: ShopItem) {
    this.shoppingService.removeOneFromItemCount(item);
    this.resetShoppingCart();
  }

  /**
   * Gets the products and the total price from the shopping cart (ShoppingService)
   */
  resetShoppingCart() {
    this.shoppingCartItems = this.shoppingService.getShoppingCart();
    this.totalPrice = this.shoppingService.getTotalPrice();
  }

  /**
   *  Called when the 'done button' is clicked.
   *  Presents a loading window while it handles the NFC setup.
   */
  async onDoneClicked() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();

    this.setNdefListener()
      .then(() => {
        return this.setNdefSubscription();
      })
      .then(() => {
        this.loading.dismiss();
        this.setReadNfcAlert();
      })
      .catch(() => {
        this.loading.dismiss();
        this.alertNfcUnavailable();
      });
  }

  /**
   * NFC setup. Checks if the NFC is enabled and creates a listener if it doesn't exist yet.
   * @returns Resolves when the setup is done
   */
  setNdefListener(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.nfc.enabled()
        .then(() => {
          if (!this.existingObservable) {
            this.ndefEventObservable = this.nfc.addNdefListener();
            this.existingObservable = true;
            resolve();
          } else {
            resolve();
          }
        })
        .catch(() => {
          this.existingObservable = false;
          reject(new Error());
        });
    });
  }

  /**
   *  Subscribes to the NFC listener.
   *  @returns Resolves when the subscription has been done.
   */
  private setNdefSubscription(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.nfcSubscription = this.ndefEventObservable.subscribe((event) => {
        this.onNdefEvent(event);
      });
      resolve();
    });
  }

  /**
   *  Dismisses the current alert on screen and reads the data from the NFC event.
   *  When the data is successfully read, tells the ShoppingService to set the order with the data provided.
   * @param event NFC tag event
   */
  private onNdefEvent(event) {
    this.listenAlert.dismiss();

    // Read from register 4
    let payload = this.nfc.bytesToString(event.tag.ndefMessage[4].payload);
    payload = payload.substring(3);

    let restaurantName = this.nfc.bytesToString(event.tag.ndefMessage[3].payload);
    restaurantName = restaurantName.substring(3);

    this.shoppingService.setOrder(payload)
      .then(() => {
        this.alertCtrl.create({
          message: 'Your order has been successfully submitted for: ' + restaurantName,
          buttons: [
            {text: 'Okay'}
          ]
        }).then(alertEl => {
          alertEl.present();
        });
      })
      .catch(() => {
        this.alertCtrl.create({
          message: 'There has been an error while submitting your order, please retry',
          buttons: [
            {text: 'Okay'}
          ]
        }).then(alertEl => {
          alertEl.present();
        });
      });
  }

  /**
   *  Presents a toast, notifying the user to approach the device to the NFC tag.
   *  When this toast is dismissed, it unsubscribes to the NFC listener to avoid multiple reads.
   */
  private async setReadNfcAlert() {
    this.listenAlert = await this.alertCtrl.create({
      message: 'Please approach your phone to the NFC tag',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.nfcSubscription.unsubscribe();
          }
        }
      ]
    });
    await this.listenAlert.present();
    await this.listenAlert.onDidDismiss().then(() => {
      this.nfcSubscription.unsubscribe();
    });
  }

  /**
   *  Presents a toast, notifying the user that the NFC isn't currently available at the device.
   */
  private alertNfcUnavailable() {
    this.alertCtrl.create({
      message: 'Please enable NFC first',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel'
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

}
