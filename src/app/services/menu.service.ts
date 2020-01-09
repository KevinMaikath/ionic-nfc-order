import {Injectable} from '@angular/core';
import {Menu} from '../models/menu';
import {AngularFirestore, CollectionReference, DocumentReference} from '@angular/fire/firestore';
import {MenuOptions, MenuOptionsValues} from '../models/menu-options';
import {MenuSelector} from '../models/menu-selector';
import {Product} from '../models/product';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  MENUS_ROOT_COLLECTION = '/menus';
  menuList: Menu[];

  constructor(private firebase: AngularFirestore) {
  }

  loadMenuList() {
    return new Promise<void>((resolve, reject) => {
      this.firebase.collection(this.MENUS_ROOT_COLLECTION)
        .get()
        .subscribe(querySnapshot => {
          this.menuList = [];
          querySnapshot.forEach(doc => {
            const menu = doc.data() as Menu;
            this.menuList.push(menu);
          });
          resolve();
        });
    });
  }

  getMenuList() {
    return this.menuList;
  }

  loadCategoryItems(categoryRef: DocumentReference, menuOptionsIndex: number,
                    callback: (values: MenuOptionsValues, component: any) => void,
                    componentReference: any) {
    categoryRef.get()
      .then(categoryDoc => {
        const category = categoryDoc.data() as Category;
        const categoryName = category.name;
        for (const productReference of category.items) {
          productReference.get()
            .then(productDoc => {
              const product = productDoc.data() as Product;
              const values: MenuOptionsValues = {
                index: menuOptionsIndex,
                product,
                categoryName
              };
              callback(values, componentReference);
            });
        }
      });

  }

}
