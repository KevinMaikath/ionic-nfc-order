import {Component, OnInit} from '@angular/core';
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
export class ShoppingCartPage implements OnInit {

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

  onDoneClicked() {
    this.setNdefListener();
    this.setNdefSubscription();

    // this.loading = await this.loadingCtrl.create({
    //   message: 'Wait a second...',
    //   duration: 3000
    // });
    //
    // await this.loading.present();

  }

  // Check if the listener is currently on,
  // so that we dont add multiple listeners
  private setNdefListener() {
    if (!this.existingObservable) {
      this.ndefEventObservable = this.nfc.addNdefListener(() => {
        this.existingObservable = true;
      }, (err) => {
        this.existingObservable = false;
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
      });
    }
  }

  private setNdefSubscription() {
    this.nfcSubscription = this.ndefEventObservable.subscribe((event) => {
      this.onNdefEvent(event);
    });
    this.setReadNfcAlert();
  }

  private onNdefEvent(event) {
    this.listenAlert.dismiss();

    // Read from register 4
    let payload = this.nfc.bytesToString(event.tag.ndefMessage[4].payload);
    payload = payload.substring(3);
    this.alertCtrl.create({
      message: payload,
      buttons: [
        {text: 'Cancel'}
      ]
    }).then(alertEl => {
      alertEl.present();
    });

    this.nfcSubscription.unsubscribe();
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
  }


}
