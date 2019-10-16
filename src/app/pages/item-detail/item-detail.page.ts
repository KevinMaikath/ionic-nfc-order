import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogService} from '../../services/catalog.service';
import {CategoryItem} from '../../models/category-item';
import {ShoppingService} from '../../services/shopping.service';
import {ShopItem} from '../../models/shop-item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {

  categoryItem: CategoryItem;

  constructor(private activatedRoute: ActivatedRoute,
              private catalogService: CatalogService,
              private router: Router,
              private shoppingService: ShoppingService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('itemDocRef')) {
        this.router.navigate(['/catalog']);
        return;
      }
      const itemDocumentRef = paramMap.get('itemDocRef');
      this.categoryItem = new CategoryItem();
      this.catalogService.getItem(itemDocumentRef)
        .get()
        .subscribe(documentSnapshot => {
          const data = documentSnapshot.data();
          this.categoryItem.name = data.name;
          this.categoryItem.imgUrl = data.imgUrl;
          this.categoryItem.price = data.price;
          this.categoryItem.ingredients = data.ingredients;
        });
    });
  }

  addOneToItemCount(item: CategoryItem) {
    const shopItem = new ShopItem();
    shopItem.name = item.name;
    shopItem.price = item.price;
    this.shoppingService.addItemToShoppingCart(shopItem);
  }

}
