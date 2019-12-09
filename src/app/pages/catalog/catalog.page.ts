import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CatalogService} from '../../services/catalog.service';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';

/**
 * Main app page. It shows a list of the product categories.
 */
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  /** List of the categories to display. */
  categories: Category[];

  /** Dependency injector. */
  constructor(private catalogService: CatalogService,
              private categoryService: CategoryService,
              private router: Router) {
  }

  /**
   * Tells the CatalogService to load all the categories data and assigns it to the "categories" variable when loaded.
   */
  ngOnInit() {
    this.catalogService.loadCategories()
      .then(() => {
        this.categories = this.catalogService.getCategories();
      });
  }

  /**
   *  Navigates to CategoryPage, passing the selected category trough the CategoryService.
   * @param category Selected category
   */
  onCategoryClick(category: Category) {
    this.categoryService.setCurrentCategory(category);
    this.router.navigate(['/category']);
  }

}
