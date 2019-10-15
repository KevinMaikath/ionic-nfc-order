import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../models/category';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {

  @Input() category: Category;

  constructor() { }

  ngOnInit() {}

}
