import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { Explore } from '../pages/explore/explore';
import { Page2 } from '../pages/page2/page2';
import { MainPage } from '../pages/main-page/main-page';
import { MediaPage } from '../pages/media-page/media-page';
import { Collections } from '../pages/collections/collections';

import { ConnectivityService } from '../providers/connectivity-service';
import { InstagramService } from '../providers/instagram-service';
import { FlickrService } from '../providers/flickr-service';

import { ShareService } from '../providers/share-service';

@NgModule({
  declarations: [
    MyApp,
    Explore,
    Page2,
    MainPage,
    MediaPage,
    Collections
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Explore,
    Page2,
    MainPage,
    MediaPage,
    Collections
  ],
  providers: [ConnectivityService, InstagramService, FlickrService, ShareService]
})
export class AppModule {}
