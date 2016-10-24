import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InstagramService } from '../../providers/instagram-service';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Geolocation } from 'ionic-native';

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
	mapInitialised: boolean = false;
  	apiKey: any = "AIzaSyBPZOuQNePXO9izuGtazWZuRHwkeRMi4bE";

  constructor(public navCtrl: NavController,public instagramService: InstagramService, public connectivityService: ConnectivityService) {
  	this.loadGoogleMaps();
  }

  loadGoogleMaps(){
 
    this.addConnectivityListeners();
 
  	if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
	    console.log("Google maps JavaScript needs to be loaded.");
	    this.disableMap();
	 
	    if(this.connectivityService.isOnline()){
	      console.log("online, loading map");
	 
	      //Load the SDK
	      window['mapInit'] = () => {
	        this.initMap();
	        this.enableMap();
	      }
	 
	      let script = document.createElement("script");
	      script.id = "googleMaps";
	 
	      if(this.apiKey){
	        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
	      } else {
	        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
	      }
	 
	 	  if (!document.getElementById('googleMaps')) {			    
		  	console.log("Adding script: "+script.src);
	      	document.body.appendChild(script); 
		  } else {
		  	console.log("Map script exists, skip add.");
		  }

	 	   
	 
	    } 
	}
	else {
	 
	    if(this.connectivityService.isOnline()){
	      console.log("showing map");
	      this.initMap();
	      this.enableMap();
	    }
	    else {
	      console.log("disabling map");
	      this.disableMap();
	    }
	 
	  }
 
  }
 

  initMap(){
 
    this.mapInitialised = true;
 	let latLng = new google.maps.LatLng(48.874669, 2.229712);

    Geolocation.getCurrentPosition().then((position) => {
      latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    }, (err) => {
	  console.log("Error getting position: " + err);
    });

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
 
  }


  disableMap(){
    console.log("disable map");
  }
 
  enableMap(){
    console.log("enable map");
  }


  addConnectivityListeners(){
 
    let onOnline = () => {
 
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
          this.loadGoogleMaps();
 
        } else {
 
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
      }, 2000);
 
    };
 
    let onOffline = () => {
      this.disableMap();
    };
 
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
 
  }

  	showPics(){
  		// http://blog.ionic.io/handling-cors-issues-in-ionic/
  		//let apiRequest = "http://localhost:8100/instagram/v1/media/search?lat="+this.map.getCenter().lat()+"&lng="+this.map.getCenter().lng()+"&distance=5000&access_token=31204544.010c112.4f7224ba859c481d960faf4c8a2303d5";
  		let apiRequest = "https://api.instagram.com/v1/media/search?lat="+this.map.getCenter().lat()+"&lng="+this.map.getCenter().lng()+"&distance=5000&access_token=31204544.010c112.4f7224ba859c481d960faf4c8a2303d5";
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
