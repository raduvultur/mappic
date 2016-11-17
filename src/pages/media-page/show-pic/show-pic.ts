import { Component } from '@angular/core';
import { LoadingController, NavParams, ViewController } from 'ionic-angular';
import { FlickrService } from '../../../providers/flickr-service';

import { MediaItem } from '../../../models/media-item';
/*
  Generated class for the ShowPic page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var response;

@Component({
  selector: 'page-show-pic',
  templateUrl: 'show-pic.html'
})
export class ShowPic {

  pic: MediaItem;
  picUrl : string;
  loading : any;
  
  constructor(public params: NavParams, 
              private flickrService: FlickrService,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController) {
    //console.log(this.params.get("pic"));
    this.pic = this.params.get("pic"); 
    this.findPhotoUrl();
  }
  
  /*
  https://www.flickr.com/services/api/explore/flickr.photos.getSizes
  https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=d9d5cc05a654a396190ad3403494361f&photo_id=30694276246&format=json&nojsoncallback=1


  https://github.com/driftyco/ionic-image-gallery-app/blob/master/app/pages/viewer/photo-viewer.ts
  */

  findPhotoUrl(){
    
    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
      spinner: 'crescent'
    });
    this.loading.present();
    
    this.flickrService.getSizes(this.pic.photo_id)
    .then(data => {
        console.log('after getSize');
        console.log(data);
        //response = data;
        let resp: any = data;
        //this.picUrl = resp.sizes.size[resp.sizes.size.length-1].source;
        this.picUrl = resp.sizes.size[7].source;
        console.log(this.picUrl);
        this.loading.dismiss();
    }, (err) => {
        console.log(err);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
