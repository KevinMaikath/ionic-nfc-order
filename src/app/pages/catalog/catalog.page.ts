import {Component, OnInit} from '@angular/core';
import {CatalogService} from '../../services/catalog.service';
import {Category} from '../../models/category';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.page.html',
    styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

    categories: Category[];

    constructor(private catalogService: CatalogService) {
    }

    ngOnInit() {
        console.log('/////// CATALOG: ON INIT ///////////')
        this.catalogService.getCategories()
            .get()
            .subscribe(querySnapshot => {
                this.categories = [];
                querySnapshot.forEach(doc => {
                    const cat = new Category();
                    cat.name = doc.data().name;
                    cat.imgUrl = doc.data().imgUrl;
                    cat.itemsRef = doc.data().itemsRef;
                    this.categories.push(cat);
                });
            });
    }

}
