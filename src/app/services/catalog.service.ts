import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {Category} from '../models/category';

/**
 *  Handles the data needed for CatalogPage.
 *  Loads data from firebase.
 */
@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  /** Firestore root url for 'categories' collection */
  CATEGORIES_ROOT_COLLECTION = 'categories';

  /** List of categories, loaded from firebase */
  categories: Category[];

  /** Dependency injector. */
  constructor(private firebase: AngularFirestore) {
    firebase.firestore.enablePersistence()
      .catch((err) => {
        if (err.code === 'failed-precondition') {
          console.log('FAILED PRECONDITION FOR FIREBASE PERSISTENCE');
        } else if (err.code === 'unimplemented') {
          console.log('THIS DEVICE DOESN\'T SUPPORT PERSISTENCE');
        }
      });
  }

  /**
   * Loads the categories list from firebase and stores it in the "categories" variable.
   * @returns Resolves when the data has been loaded
   */
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

  /** Returns the "categories" list. */
  getCategories() {
    return this.categories;
  }

}
