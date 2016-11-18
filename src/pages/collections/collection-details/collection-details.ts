import { Component, NgZone } from '@angular/core';
import { NavParams, NavController, ViewController } from 'ionic-angular';
import { Database } from '../../../providers/database';
import { MediaItem } from '../../../models/media-item';
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
  collectionMediaItems: Array<MediaItem> = new Array<MediaItem>();

  constructor(public params: NavParams, 
              public navCtrl: NavController, 
              private zone: NgZone,
              public viewCtrl: ViewController, 
              private database: Database) {}

  ionViewDidLoad() {
    console.log('Hello CollectionDetails Page');
    this.collection = this.params.get("collection");
  }
  
  ionViewWillEnter() {
    
    this.database.getCollectionItems()
      .then(data => {
          this.zone.run(() => {
              console.log(data);
              console.log("-----------------");
              this.collectionMediaItems = data;
              console.log(this.collectionMediaItems);
          });
      })
      .catch(console.error.bind(console));
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  delete() {
    
    //TODO: delete media in collection, THEN delete collection!
    
    this.database.delete(this.collection);
    this.viewCtrl.dismiss();
  }

}
