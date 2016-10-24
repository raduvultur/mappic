import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InstagramService } from '../../providers/instagram-service';
import { FlickrService } from '../../providers/flickr-service';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
  providers: [InstagramService, FlickrService]
})

export class Explore {

	@ViewChild('map') mapElement: ElementRef;
	map: any;
	private instaPics: any;
	private flickrPics: any;
	mapInitialised: boolean = false;
  apiKey: any = "AIzaSyBPZOuQNePXO9izuGtazWZuRHwkeRMi4bE";

  constructor(public navCtrl: NavController,
      private instagramService: InstagramService, 
      private connectivityService: ConnectivityService, 
      private flickrService: FlickrService) 
  {
  	//this.loadGoogleMaps();
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
	 
	      script.src = 'https://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
	 
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
 	  let latLng = new google.maps.LatLng(48.874669, 2.229712);
/*
    Geolocation.getCurrentPosition().then((position) => {
      latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    }, (err) => {
	    console.log("Error getting position: " + err);
    });*/

    let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var targetCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      //center: this.map.center,
      radius: 5000
    });
    targetCircle.bindTo('center', this.map, 'center');
 
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

  	showPics() {
  	    let mapLat = this.map.getCenter().lat();
  	    let mapLon = this.map.getCenter().lng();
  	    
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
  	    
  	    //this.presentToast(this.instaPics.length, this.flickrPics.length);
  	}


    /*presentToast(nrInsta, nrFlickr) {
      let toast = this.toastCtrl.create({
        message: 'Search returned '+nrInsta+' results from Instagram and '+nrFlickr+' from flickr.',
        duration: 2000,
        position: 'bottom'
      });
    
      toast.present();
    }*/

}
