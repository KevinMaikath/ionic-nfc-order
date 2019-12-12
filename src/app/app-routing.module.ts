import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule'},
  // {path: 'catalog', loadChildren: './pages/catalog/catalog.module#CatalogPageModule'},
  // {path: 'category', loadChildren: './pages/category/category.module#CategoryPageModule'},
  // {path: 'item-detail', loadChildren: './pages/item-detail/item-detail.module#ItemDetailPageModule'},
  {path: 'shopping-cart', loadChildren: './pages/shopping-cart/shopping-cart.module#ShoppingCartPageModule'},
  // {path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule'},
  // {path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
