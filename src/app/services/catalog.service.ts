import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    CATEGORIES_REF = 'categories';

    constructor(private firebase: AngularFirestore) {
    }

    getCategories() {
        return this.firebase.collection(this.CATEGORIES_REF);
    }


}
