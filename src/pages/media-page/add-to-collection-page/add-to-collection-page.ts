import { Component, NgZone } from '@angular/core';
import { NavParams, ViewController, AlertController  } from 'ionic-angular';
import { Database } from '../../../providers/database';
/*
  Generated class for the AddToCollectionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-to-collection-page',
  templateUrl: 'add-to-collection-page.html'
})

export class AddToCollectionPage {

  public collections = [];

  constructor(public params: NavParams, 
  public viewCtrl: ViewController,
  private database: Database,
  private zone: NgZone,
  public alertCtrl: AlertController) {
    console.log(this.params.get("selectedItems"));
  }

  ionViewDidLoad() {
    console.log('Hello AddToCollectionPage Page');
  }
  
  ionViewWillEnter() {
    
    this.database.getCollections()
      .then(data => {
          this.zone.run(() => {
              this.collections = data;
          });
      })
      .catch(console.error.bind(console));
    
  }  

  dismiss() {
    this.viewCtrl.dismiss();
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
  
  collectionSelected(collection){
    console.log(collection);
    this.dismiss();
  }
  
}
