import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FlickrService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FlickrService {

  constructor(public http: Http) {
    console.log('FlickrService provider started');
  }

  public data: any;
	private flickrApiKey: any = 'c58aa17eacce8fa53423cf76022724fb';
  private flickrRadius: any = 5;
  
  load(flic) {
	  
	  if (this.data) {
	    // already loaded data
	    return Promise.resolve(this.data);
	  }

    //https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0589b749bc7d4ecb9093a62f5da4f1d2&lat=48.874669&lon=2.229712&radius=5&format=json&nojsoncallback=1&auth_token=72157674226247102-732deb71e2c1d5ef&api_sig=79827040d266cd327fdfdfdd2dcb5a85

		let flickrUrl = "https://api.flickr.com/services/rest/?method=";

    //&distance=5000&access_token=31204544.010c112.4f7224ba859c481d960faf4c8a2303d5"
    flickrUrl += flic + "&per_page=20&&extras=date_upload,date_taken,url_q,url_o&per_page=20&format=json&nojsoncallback=1&radius=" + this.flickrRadius + "&api_key=" + this.flickrApiKey;

	  // don't have the data yet
	  return new Promise(resolve => {
	    // We're using Angular HTTP provider to request the data
	    console.log("calling: " + flickrUrl);
	    this.http.get(flickrUrl)
	      .map(res => res.json())
	      .subscribe(data => {
	        // we've got back the raw data
	        resolve(data);
	      });
	  });
	}

}
