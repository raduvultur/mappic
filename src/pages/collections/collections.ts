import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Collections page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-collections',
  templateUrl: 'collections.html'
})
export class Collections {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Collections Page');
  }

}
