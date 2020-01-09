import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MenuPage} from './menu.page';
import {MenuPickerModalComponent} from './menu-picker-modal/menu-picker-modal.component';

const routes: Routes = [
  {
    path: '',
    component: MenuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage, MenuPickerModalComponent],
  entryComponents: [MenuPickerModalComponent]
})
export class MenuPageModule {
}
