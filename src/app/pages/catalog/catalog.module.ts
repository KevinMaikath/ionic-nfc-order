import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CatalogPage } from './catalog.page';
import {ItemListComponent} from '../../components/item-list/item-list.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CatalogPage, ItemListComponent]
})
export class CatalogPageModule {}
