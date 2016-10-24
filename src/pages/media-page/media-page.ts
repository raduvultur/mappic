import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InstagramService } from '../../providers/instagram-service';
import { FlickrService } from '../../providers/flickr-service';
import { ShareService } from '../../providers/share-service';

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

	private instaPics: any;
	private flickrPics: any;
	
  constructor(public navCtrl: NavController,
      private instagramService: InstagramService,
      private flickrService: FlickrService,
      private shareService: ShareService) {}

  ionViewWillEnter() {
    this.showPics();
  }

	showPics() {
	    console.log('showPics called');
	    let mapLat = this.shareService.map.getCenter().lat();
	    let mapLon = this.shareService.map.getCenter().lng();
	    
	    // http://blog.ionic.io/handling-cors-issues-in-ionic/
	    let apiInstagramRequest = "/media/search?lat=" + mapLat + "&lng=" + mapLon;

	    this.instagramService.load(apiInstagramRequest)
	        .then(data => {
	            //console.log(data.data);
	            this.instaPics = data.data;
	        }, (err) => {
	            console.log(err);
	        });
	    //https://instagram.com/oauth/authorize/?client_id=010c1121386c4b9a927c009727e6fb21&scope=public_content&redirect_uri=http://localhost&response_type=token
	    
	    let apiFlickrRequest = "flickr.photos.search&lat=" + mapLat + "&lon=" + mapLon;

	    this.flickrService.load(apiFlickrRequest)
	        .then(data => {
	            //console.log(data);
	            this.flickrPics = data.photos.photo;
	        }, (err) => {
	            console.log(err);
	        });
	    
	}

}
