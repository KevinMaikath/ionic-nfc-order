import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CatalogService} from '../../services/catalog.service';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  categories: Category[];

  constructor(private catalogService: CatalogService,
              private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit() {
    this.catalogService.loadCategories()
      .then(() => {
        this.categories = this.catalogService.getCategories();
      });
  }

  onCategoryClick(category: Category) {
    this.categoryService.setCurrentCategory(category);
    this.router.navigate(['/category']);
  }

}
