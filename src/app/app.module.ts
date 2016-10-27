import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { Explore } from '../pages/explore/explore';
import { Settings } from '../pages/settings/settings';
import { MainPage } from '../pages/main-page/main-page';
import { MediaPage } from '../pages/media-page/media-page';
import { AddToCollectionPage } from '../pages/media-page/add-to-collection-page/add-to-collection-page';
import { Collections } from '../pages/collections/collections';

import { ConnectivityService } from '../providers/connectivity-service';
import { InstagramService } from '../providers/instagram-service';
import { FlickrService } from '../providers/flickr-service';

import { ShareService } from '../providers/share-service';
import { Database } from '../providers/database';

@NgModule({
  declarations: [
    MyApp,
    Explore,
    Settings,
    MainPage,
    MediaPage,
    AddToCollectionPage,
    Collections
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Explore,
    Settings,
    MainPage,
    MediaPage,
    AddToCollectionPage,
    Collections
  ],
  providers: [ConnectivityService, InstagramService, FlickrService, ShareService, Database]
})
export class AppModule {}
