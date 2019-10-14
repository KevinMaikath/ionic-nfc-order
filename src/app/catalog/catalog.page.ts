import {Component, OnInit} from '@angular/core';
import {Item} from '../models/item';
import {CatalogService} from '../services/catalog.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.page.html',
    styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

    categories: any[];

   // item: Observable<any>;

    constructor(private catalogService: CatalogService) {
    }

    ngOnInit() {
        this.catalogService.getCategories()
            .snapshotChanges()
            .subscribe(items => {
                this.categories = [];
                items.forEach(element => {
                    let elem = element.payload.toJSON();
                    elem['name'] = element.key;
                    this.categories.push(elem);
                });
            });

        // this.item = this.catalogService.getItem('Hamburgers', 'Chicken burger');
    }

}
