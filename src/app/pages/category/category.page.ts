import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogService} from '../../services/catalog.service';
import {CategoryItem} from '../../models/category-item';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  items: CategoryItem[];
  categoryName: string;

  constructor(private activatedRoute: ActivatedRoute,
              private catalogService: CatalogService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('catColRef')) {
        this.router.navigate(['/catalog']);
        return;
      }
      this.categoryName = this.catalogService.getCurrentCategoryName();
      const categoryCollectionRef = paramMap.get('catColRef');
      this.catalogService.getCategoryItems(categoryCollectionRef)
        .get()
        .subscribe(querySnapshot => {
          this.items = [];
          querySnapshot.forEach(doc => {
            const item = new CategoryItem();
            item.name = doc.data().name;
            item.imgUrl = doc.data().imgUrl;
            item.ingredients = doc.data().ingredients;
            this.items.push(item);
          });
        });
    });
  }

}
