import { Component } from '@angular/core';
import { Explore } from '../explore/explore';
import { Page2 } from '../page2/page2';
import { MediaPage } from '../media-page/media-page';

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
  tab3 = Page2;
    
  constructor() {

  }

  ionViewDidLoad() {
    console.log('Hello MainPage Page');
  }

}
