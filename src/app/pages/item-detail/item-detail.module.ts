import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ItemDetailPage} from './item-detail.page';

import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';

const routes: Routes = [
  {
    path: '',
    component: ItemDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [ScreenOrientation],
  declarations: [ItemDetailPage]
})
export class ItemDetailPageModule {
}
