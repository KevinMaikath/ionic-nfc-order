import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'catalog', pathMatch: 'full' },
  { path: 'catalog', loadChildren: './pages/catalog/catalog.module#CatalogPageModule' },
  { path: 'category/:catColRef', loadChildren: './pages/category/category.module#CategoryPageModule' },
  { path: 'item-detail/:itemDocRef', loadChildren: './pages/item-detail/item-detail.module#ItemDetailPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
