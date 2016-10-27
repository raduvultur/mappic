import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { InstagramService } from '../../providers/instagram-service';
import { FlickrService } from '../../providers/flickr-service';
import { ShareService } from '../../providers/share-service';
import { AddToCollectionPage } from './add-to-collection-page/add-to-collection-page';

import { MediaItem } from '../../models/media-item';
/*
  Generated class for the MediaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-media-page',
  templateUrl: 'media-page.html'
})

export class MediaPage {

  instaPics: any;
  flickrPics: any;
  selection: boolean = false;
  lat: any;
  lon: any;
  howManySelected: number = 0;
  flickrMediaItems: Array<MediaItem> = new Array<MediaItem>();
	
  constructor(public navCtrl: NavController,
  		public modalCtrl: ModalController,
      private instagramService: InstagramService,
      private flickrService: FlickrService,
      private shareService: ShareService) {}

  ionViewWillEnter() {
  	
    let mapLat = this.shareService.map.getCenter().lat();
    let mapLon = this.shareService.map.getCenter().lng();
  	
  	if (mapLat !== this.lat || mapLon !== this.lon){
  		this.lat = mapLat;
  		this.lon = mapLon;
			this.selection = false;
			this.howManySelected = 0;
	
	  	this.flickrMediaItems = new Array<MediaItem>();
	    this.showPics();
  	}

  }

  presentModal() {
  	let selectedItems: Array<MediaItem> = new Array<MediaItem>();
  	for(let selectedPhoto of this.flickrMediaItems) {
  		if (selectedPhoto.selected){
  			selectedItems.push(selectedPhoto);
  		}
  	}
  	
    let modal = this.modalCtrl.create(AddToCollectionPage, {"selectedItems": selectedItems});
		modal.onDidDismiss(() => {
      this.toggleSelection();
    });    
    modal.present();
  }
  
	toggleSelection(){
		this.selection = !this.selection;
		
		if (!this.selection){
			//TODO: clear selected checkboxes
			console.log("clear selected checkboxes");
			for(let selectedPhoto of this.flickrMediaItems) {
				selectedPhoto.selected = false;
	  	}
		}
		
	}

	clickCheck(sel){
		if (sel){
			this.howManySelected++;
		} else {
			this.howManySelected--;
		}
		console.log(this.howManySelected);
	}

	showPics() {
    console.log('showPics called');
    
    // http://blog.ionic.io/handling-cors-issues-in-ionic/
    let apiInstagramRequest = "/media/search?lat=" + this.lat + "&lng=" + this.lon;

    this.instagramService.load(apiInstagramRequest)
        .then(data => {
            this.instaPics = data.data;
        }, (err) => {
            console.log(err);
        });
    //https://instagram.com/oauth/authorize/?client_id=010c1121386c4b9a927c009727e6fb21&scope=public_content&redirect_uri=http://localhost&response_type=token
    
    let apiFlickrRequest = "flickr.photos.search&lat=" + this.lat + "&lon=" + this.lon;

    this.flickrService.load(apiFlickrRequest)
        .then(data => {

		        for(let photo of data.photos.photo) {
		        	let mediaItem = new MediaItem();
		        	mediaItem.title= photo.title;
		        	mediaItem.url_small= photo.url_q;
		        	mediaItem.selected= false;
		        	this.flickrMediaItems.push(mediaItem);
		        }	            
            
        }, (err) => {
            console.log(err);
        });
	}

}
