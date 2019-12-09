import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ShoppingCartPage} from './shopping-cart.page';

// NFC module
import {NFC} from '@ionic-native/nfc/ngx';

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [NFC],
  declarations: [ShoppingCartPage]
})
export class ShoppingCartPageModule {
}
