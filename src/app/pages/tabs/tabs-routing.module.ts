import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'catalog',
        loadChildren: () => import('../catalog/catalog.module').then(m => m.CatalogPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('../menu/menu.module').then(m => m.MenuPageModule)
      },
      {
        path: 'catalog/category',
        loadChildren: () => import('../category/category.module').then(m => m.CategoryPageModule)
      },
      {
        path: 'catalog/item-detail',
        loadChildren: () => import('../item-detail/item-detail.module').then(m => m.ItemDetailPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/catalog',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
