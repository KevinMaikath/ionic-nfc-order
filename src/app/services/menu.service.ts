import {Injectable} from '@angular/core';
import {Menu} from '../models/menu';
import {AngularFirestore} from '@angular/fire/firestore';

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

}
