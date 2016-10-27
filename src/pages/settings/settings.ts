import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareService } from '../../providers/share-service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {

  constructor(public navCtrl: NavController, private shareService: ShareService) {
  }

}
