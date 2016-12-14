import { Component, NgZone } from '@angular/core';
import { NavParams, NavController, ViewController, ModalController } from 'ionic-angular';
import { Database } from '../../../providers/database';
import { MediaItem } from '../../../models/media-item';
import { ShowPic } from '../../media-page/show-pic/show-pic';

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
              public modalCtrl: ModalController,
              private database: Database) {}

  ionViewDidLoad() {
    console.log('Hello CollectionDetails Page');
    this.collection = this.params.get("collection");
  }
  
  ionViewWillEnter() {
    this.database.getCollectionItems(this.collection)
      .then(data => {
          this.zone.run(() => {
              this.collectionMediaItems = data.filter(function(n){ return n != undefined });
          });
      })
      .catch(console.error.bind(console));
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  delete() {
    //TODO: delete media in collection, THEN delete collection!
    for (let collectionMediaItem of this.collectionMediaItems){
      this.database.deleteFromCollection(collectionMediaItem);
    }
    this.database.delete(this.collection);
    
    this.viewCtrl.dismiss();
  }
  
  presentMediaModal(pic) {
  	let modal = this.modalCtrl.create(ShowPic, {"pic": pic, "parent": "collection-details"});
		modal.onDidDismiss(() => {});    
    modal.present();
  }  

}
