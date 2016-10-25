import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the InstagramService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class InstagramService {

  public data: any;
	private instaAccessToken: any = '31204544.010c112.4f7224ba859c481d960faf4c8a2303d5';
  private instaRadius: any = 5000;

  constructor(public http: Http) {
    console.log('InstagramService provider started');
  }

  load(insta) {
	  
	  if (this.data) {
	    // already loaded data
	    return Promise.resolve(this.data);
	  }

		//let instaUrl = "https://mappic-raduvultur.c9users.io/instagram/v1";
		//let instaUrl = "http://localhost:8100/instagram/v1";
		let instaUrl = "https://api.instagram.com/v1";

    //&distance=5000&access_token=31204544.010c112.4f7224ba859c481d960faf4c8a2303d5"
    instaUrl += insta + "&distance=" + this.instaRadius + "&access_token=" + this.instaAccessToken;

	  // don't have the data yet
	  return new Promise(resolve => {
	    // We're using Angular HTTP provider to request the data
	    console.log("calling: " + instaUrl);
	    this.http.get(instaUrl)
	      .map(res => res.json())
	      .subscribe(data => {
	        // we've got back the raw data
	        resolve(data);
	      });
	  });
	}

}
