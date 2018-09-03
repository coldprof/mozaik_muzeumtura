import { Component } from '@angular/core';

import { NavParams, ViewController} from 'ionic-angular';
import { Network } from '@ionic-native/network';


/**
 * Generated class for the MuseumModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'news-modal',
  templateUrl: 'news-modal.html'
})
export class NewsModalComponent {
  news: any;
  conntype: string ="";
  constructor(public params: NavParams, public vievCtrl: ViewController, private _net: Network){
    this.news =  params.get("news");
    this.conntype = this._net.type;
  }





  dismiss(){
    this.vievCtrl.dismiss();
  }

}
