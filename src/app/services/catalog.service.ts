import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {Category} from '../models/category';
import {Product} from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  CATEGORIES_ROOT_COLLECTION = 'categories';
  categories: Category[];
  currentCategoryName: string;

  constructor(private firebase: AngularFirestore) {
  }

  loadCategories() {
    return new Promise<void>((resolve, reject) => {
      this.firebase.collection(this.CATEGORIES_ROOT_COLLECTION)
        .get()
        .subscribe(querySnapshot => {
          this.categories = [];
          querySnapshot.forEach(doc => {
            const category = doc.data() as Category;
            this.categories.push(category);
          });
          resolve();
        });
    });
  }

  getCategories() {
    return this.categories;
  }

}
