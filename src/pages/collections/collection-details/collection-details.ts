import { Component } from '@angular/core';
import { NavParams, NavController, ViewController } from 'ionic-angular';
import { Database } from '../../../providers/database';

/*
  Generated class for the CollectionDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-collection-details',
  templateUrl: 'collection-details.html'
})
export class CollectionDetails {

  public collection: any;

  constructor(public params: NavParams, public navCtrl: NavController, public viewCtrl: ViewController, private database: Database) {
    
  }

  ionViewDidLoad() {
    console.log('Hello CollectionDetails Page');
    this.collection = this.params.get("collection");
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  delete() {
    this.database.delete(this.collection);
    this.viewCtrl.dismiss();
  }

}
