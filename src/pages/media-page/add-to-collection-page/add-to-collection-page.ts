import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController  } from 'ionic-angular';
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

  collections : any;

  constructor(public params: NavParams, public viewCtrl: ViewController,public alertCtrl: AlertController) {
    console.log(this.params.get("selectedItems"));
    
    this.collections = [
        'Los Angeles',
        'Milan',
        'Paris',
        'Berlin'
    ];    
  }

  ionViewDidLoad() {
    console.log('Hello AddToCollectionPage Page');
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
          }
        }
      ]
    });
    prompt.present();
  }  
  
}
