import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the YoutubeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ShareService {

	map: any;
	searchRange: any = 5;
	
  constructor(public http: Http, public storage:Storage) {
    console.log('Hello ShareService Provider');
    this.getSettings(); 
    console.log('searchRange: '+this.searchRange);
  }

  getSettings(){
    console.log('getSettings called');
    
    this.storage.get('searchRange').then((data) => {
    if (data != null) this.searchRange = JSON.parse(data);
    	else this.searchRange = 5;    
    });
  }
  
  saveSettings(){
    let val = JSON.stringify(this.searchRange);
    this.storage.set("searchRange", val);
  }
  
}
