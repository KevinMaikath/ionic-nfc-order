import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopItem} from '../../models/shop-item';
import {ShoppingService} from '../../services/shopping.service';
import {LoadingController, AlertController} from '@ionic/angular';
import {NFC, NdefEvent} from '@ionic-native/nfc/ngx';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit, OnDestroy {

  shoppingCart: ShopItem[];
  totalPrice: number;
  loading: HTMLIonLoadingElement;
  listenAlert: HTMLIonAlertElement;

  existingObservable = false;
  ndefEventObservable: Observable<NdefEvent>;
  nfcSubscription: Subscription;

  constructor(private shoppingService: ShoppingService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private nfc: NFC) {
  }

  ngOnInit() {
    this.resetShoppingCart();
  }

  ngOnDestroy() {
    this.nfcSubscription.unsubscribe();
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

  setNdefListener(): Promise<void> {
    console.log('/////////// SET LISTENER');

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

  private setNdefSubscription(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.nfcSubscription = this.ndefEventObservable.subscribe((event) => {
        this.onNdefEvent(event);
      });
      resolve();
    });
  }

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

    // this.nfcSubscription.unsubscribe();
  }

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
