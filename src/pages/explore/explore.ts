import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import { ShareService } from '../../providers/share-service';

declare var google;

@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})

export class Explore {

	@ViewChild('map') mapElement: ElementRef;

	mapInitialised: boolean = false;
  apiKey: any = "AIzaSyBPZOuQNePXO9izuGtazWZuRHwkeRMi4bE";
	mapLat: any = 48.874669;
	mapLon: any = 2.229712;
	targetCircle : any;
	
  constructor(public navCtrl: NavController,
      private shareService: ShareService,
      private connectivityService: ConnectivityService) 
  {
  	//this.loadGoogleMaps();
  }
  
  ionViewWillEnter() {
    console.log('radius changing '+(this.shareService.searchRange * 1000));
    this.targetCircle.setRadius(this.shareService.searchRange * 1000);
  }
  
  ionViewDidLoad() {
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
	 
	      script.src = 'https://maps.google.com/maps/api/js?libraries=places&key=' + this.apiKey + '&callback=mapInit';
	 
  	 	  if (!document.getElementById('googleMaps')) {			    
  		  	console.log("Adding script: "+script.src);
  	      	document.body.appendChild(script); 
  		  } else {
  		  	console.log("Map script exists, skip add.");
  		  }
	 
	    } 
  	} else {
	 
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
 	  let latLng = new google.maps.LatLng(this.mapLat, this.mapLon);
/*
    Geolocation.getCurrentPosition().then((position) => {
      this.mapLat = position.coords.latitude;
      this.mapLon = position.coords.longitude;
      latLng = new google.maps.LatLng(mapLat, mapLon);
    }, (err) => {
	    console.log("Error getting position: " + err);
    });*/

    let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.shareService.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.targetCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.shareService.map,
      radius: this.shareService.searchRange * 1000
    });
    this.targetCircle.bindTo('center', this.shareService.map, 'center');
 
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');

    this.shareService.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', this.shareService.map);
    
    var myMap = this.shareService.map;
    autocomplete.addListener('place_changed', function() {
      console.log('places_changed: '+this.getPlace().geometry.location);
      myMap.setCenter(this.getPlace().geometry.location);
    });
    
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

}
