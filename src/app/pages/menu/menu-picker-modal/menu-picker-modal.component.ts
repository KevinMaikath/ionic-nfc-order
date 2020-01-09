import {Component, Input, OnInit} from '@angular/core';
import {Menu} from '../../../models/menu';
import {ModalController} from '@ionic/angular';
import {MenuService} from '../../../services/menu.service';
import {MenuOptions, MenuOptionsValues} from '../../../models/menu-options';
import {Product} from '../../../models/product';


@Component({
  selector: 'app-menu-picker-modal',
  templateUrl: './menu-picker-modal.component.html',
  styleUrls: ['./menu-picker-modal.component.scss'],
})
export class MenuPickerModalComponent implements OnInit {

  @Input() menu: Menu;
  menuOptionsList: MenuOptions[];
  selectedOptions: Product[];

  constructor(private modalCtrl: ModalController,
              private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuOptionsList = [];
    this.selectedOptions = [];

    this.menu.selectors.forEach((item, index) => {
      const newOptions = new MenuOptions();
      newOptions.options = [];
      this.menuOptionsList.push(newOptions);
      this.selectedOptions.push(new Product());
      this.menuService.loadCategoryItems(item.collectionRef, index, this.setMenuOptions, this);
    });

  }

  setMenuOptions(values: MenuOptionsValues, componentReference: any) {
    componentReference.menuOptionsList[values.index].label = values.categoryName;
    componentReference.menuOptionsList[values.index].options.push(values.product);
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
