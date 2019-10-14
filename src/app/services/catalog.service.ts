import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Item} from '../models/item';

@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    categories: AngularFireList<any>;
    categoryItems: AngularFireList<any>;
    // item: Item;

    constructor(private firebase: AngularFireDatabase) {
    }

    getCategories() {
        return this.categories = this.firebase.list('Categories');
    }

    getCategoryItems(category: string) {
        return this.categoryItems = this.firebase.list(category);
    }

    getItem(category: string, itemName: string) {
        return this.firebase.object('Categories/' + category + '/' + itemName).valueChanges();
    }

}
