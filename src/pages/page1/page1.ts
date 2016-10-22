import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { InstagramService } from '../../providers/instagram-service';

declare var google;

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [InstagramService]
})

export class Page1 {

	@ViewChild('map') mapElement: ElementRef;
	map: any;
	public instaPics: any;

  constructor(public navCtrl: NavController,public instagramService: InstagramService) {
    
  }

	ionViewDidLoad(){
    	this.loadMap();
  	}
 
  	loadMap(){
 
 		//http://stackoverflow.com/questions/4130237/displaying-crosshairs-in-the-center-of-a-javascript-google-map

	    Geolocation.getCurrentPosition().then((position) => {
	 
	      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	 
	      let mapOptions = {
	        center: latLng,
	        zoom: 15,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	      }
	 
	      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
	    }, (err) => {

	    	let latLng = new google.maps.LatLng(48.874669, 2.229712);
	 
	      	let mapOptions = {
	        	center: latLng,
	        	zoom: 15,
	        	mapTypeId: google.maps.MapTypeId.ROADMAP
	      	}
	 
	      	this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

			var crosshairShape = {coords:[0,0,0,0],type:'rect'};
			var marker = new google.maps.Marker({
			map: this.map,
			icon: '/assets/img/cross-hairs.gif',
			shape: crosshairShape
			});
  			marker.bindTo('position', this.map, 'center');

	     	console.log(err);
	    });

  	}

  	showPics(){
  		// http://blog.ionic.io/handling-cors-issues-in-ionic/
  		let apiRequest = "http://localhost:8100/instagram/v1/media/search?lat="+this.map.getCenter().lat()+"&lng="+this.map.getCenter().lng()+"&distance=5000&access_token=31204544.010c112.4f7224ba859c481d960faf4c8a2303d5";
  		console.log(apiRequest); 
  		this.instagramService.load(apiRequest)
		  .then(data => {
		  		console.log(data.data);
		  		this.instaPics = data.data;
		  }, (err) => {
		  		console.log(err);
		  });		
  		//https://instagram.com/oauth/authorize/?client_id=010c1121386c4b9a927c009727e6fb21&scope=public_content&redirect_uri=http://localhost&response_type=token
  	}

}
