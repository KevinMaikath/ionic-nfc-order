import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    categories: AngularFireList<any>;
    categoryItems: AngularFireList<any>;

    constructor(private firebase: AngularFireDatabase) {
    }

    getCategories() {
        return this.categories = this.firebase.list('categories');
    }

    getCategory(category: string) {
        return this.categoryItems = this.firebase.list('categories/' + category);
    }

    getItem(category: string, itemName: string) {
        return this.firebase.object('categories/' + category + '/' + itemName).valueChanges();
    }

}
