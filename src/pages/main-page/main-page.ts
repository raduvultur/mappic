import { Component } from '@angular/core';
import { Explore } from '../explore/explore';
import { Settings } from '../settings/settings';
import { MediaPage } from '../media-page/media-page';
import { Collections } from '../collections/collections';

/*
  Generated class for the MainPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main-page',
  templateUrl: 'main-page.html'
})
export class MainPage {
    
  tab1 = Explore;
  tab2 = MediaPage;
  tab3 = Collections;
  tab4 = Settings;
    
  constructor() {

  }

  ionViewDidLoad() {
    console.log('Hello MainPage Page');
  }

}
