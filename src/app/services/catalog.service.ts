import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    CATEGORIES_REF = 'categories';

    currentCategoryName: string;

    constructor(private firebase: AngularFirestore) {
    }

    getCategories() {
        return this.firebase.collection(this.CATEGORIES_REF);
    }

    setCurrentCategoryName(categoryName: string) {
        this.currentCategoryName = categoryName;
    }

    getCurrentCategoryName() {
        return this.currentCategoryName;
    }

    getCategoryItems(catColRef: string) {
        return this.firebase.collection(catColRef);
    }

}
