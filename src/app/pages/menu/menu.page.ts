import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {Menu} from '../../models/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menuList: Menu[];
  splittedMenus: Menu[][];

  constructor(private menuService: MenuService) {
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
    this.splittedMenus = [];
    let i, j;
    for (i = 0, j = this.menuList.length; i < j; i += 2) {
      const temparray = this.menuList.slice(i, i + 2);
      this.splittedMenus.push(temparray);
    }
  }

}
