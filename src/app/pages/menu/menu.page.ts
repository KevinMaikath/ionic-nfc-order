import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {Menu} from '../../models/menu';
import {ModalController} from '@ionic/angular';
import {MenuPickerModalComponent} from './menu-picker-modal/menu-picker-modal.component';
import {ShoppingService} from "../../services/shopping.service";
import {ShopMenuItem} from "../../models/shop-item";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menuList: Menu[];
  splitMenus: Menu[][];

  constructor(private menuService: MenuService,
              private modalCtrl: ModalController,
              private shoppingService: ShoppingService) {
  }

  ngOnInit() {
    this.menuList = [];
    this.loadData();
  }

  loadData() {
    this.menuService.loadMenuList()
      .then(() => {
        this.menuList = this.menuService.getMenuList();
        this.splitMenusInTwo();
      });
  }

  private splitMenusInTwo() {
    this.splitMenus = [];
    let i, j;
    for (i = 0, j = this.menuList.length; i < j; i += 2) {
      const temparray = this.menuList.slice(i, i + 2);
      this.splitMenus.push(temparray);
    }
  }

  async presentMenuPicker(menu: Menu) {
    const modal = await this.modalCtrl.create({
      component: MenuPickerModalComponent,
      componentProps: {
        menu
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data != null) {
          const productList = data.data;
          const productNames = [];
          for (const product of productList) {
            productNames.push(product.name);
          }
          const menuItem = new ShopMenuItem();
          menuItem.name = menu.name;
          menuItem.price = menu.price;
          menuItem.count = 1;
          menuItem.items = productNames;
          this.shoppingService.addMenuToShoppingCart(menuItem);
        }
      });

    return await modal.present();
  }

}
