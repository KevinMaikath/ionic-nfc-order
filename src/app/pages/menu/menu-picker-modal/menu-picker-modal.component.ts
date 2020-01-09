import {Component, Input, OnInit} from '@angular/core';
import {Menu} from '../../../models/menu';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-menu-picker-modal',
  templateUrl: './menu-picker-modal.component.html',
  styleUrls: ['./menu-picker-modal.component.scss'],
})
export class MenuPickerModalComponent implements OnInit {

  @Input() menu: Menu;

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
