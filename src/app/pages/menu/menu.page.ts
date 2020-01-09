import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {Menu} from '../../models/menu';
import {ModalController} from '@ionic/angular';
import {MenuPickerModalComponent} from "./menu-picker-modal/menu-picker-modal.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menuList: Menu[];
  splitMenus: Menu[][];

  constructor(private menuService: MenuService,
              private modalCtrl: ModalController) {
    this.menuList = [];
  }

  ngOnInit() {
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

  presentMenuPicker(menu) {
    this.modalCtrl.create({
      component: MenuPickerModalComponent,
      componentProps: {
        menu
      }
    }).then(modal => {
      modal.present();
    });
  }

}
