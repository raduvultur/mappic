import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { ShareService } from '../../providers/share-service';
import { Database } from '../../providers/database';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public database: Database, public shareService: ShareService) {
  }
  
  ionViewWillEnter() {
    this.shareService.getSettings();
  }
  
  ionViewWillLeave(){
    this.shareService.saveSettings();
  }
  
  deleteDB(){
    let confirm = this.alertCtrl.create({
      title: 'Remove databases?',
      message: 'I will delete all of mappic user data. You sure?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.database.dropDB();
          }
        }
      ]
    });
    confirm.present();
  }
  
}
