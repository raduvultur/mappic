import { Component, NgZone } from '@angular/core';
import { NavController, Platform, ModalController, AlertController } from 'ionic-angular';

import { Database } from '../../providers/database';
import { CollectionDetails } from './collection-details/collection-details';

/*
  Generated class for the Collections page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-collections',
  templateUrl: 'collections.html'
})
export class Collections {

  public collections = [];

  constructor(public navCtrl: NavController, 
      private platform: Platform,
      private zone: NgZone,
      public modalCtrl: ModalController,
      private database: Database,
      public alertCtrl: AlertController) {}

  ionViewWillEnter() {
    console.log('Hello Collections Page');
    
    this.database.getCollections()
      .then(data => {
          this.zone.run(() => {
              this.collections = data;
          });
      })
      .catch(console.error.bind(console));
    
  }

    ionViewDidLoad() {
        //this.platform.ready().then(() => {
            //this.database.initDB();
        //});
    }
    
    showDetail(collection) {
      let modal = this.modalCtrl.create(CollectionDetails, {"collection": collection});
  		modal.onDidDismiss(() => {
      });    
      modal.present();
    }

    removeCollection(collection){
      this.database.delete(collection);
      var index = this.collections.indexOf(collection);
      this.collections.splice(index, 1);
    }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'New collection',
      //message: "Enter the new collection title",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            this.database.add(data);
          }
        }
      ]
    });
    prompt.present();
  }  
  
}
