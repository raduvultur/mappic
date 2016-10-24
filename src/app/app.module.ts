import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Explore } from '../pages/explore/explore';
import { Page2 } from '../pages/page2/page2';
import { ConnectivityService } from '../providers/connectivity-service';
import { InstagramService } from '../providers/instagram-service';
import { FlickrService } from '../providers/flickr-service';

@NgModule({
  declarations: [
    MyApp,
    Explore,
    Page2
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Explore,
    Page2
  ],
  providers: [ConnectivityService, InstagramService, FlickrService]
})
export class AppModule {}
