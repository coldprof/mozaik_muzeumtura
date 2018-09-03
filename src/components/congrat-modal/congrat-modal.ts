import { NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'congrat-modal',
  templateUrl: 'congrat-modal.html'
})
export class CongratModalComponent {
  muid:number=0;
  constructor(public navparams:NavParams, public vievCtrl:ViewController){
      this.muid=navparams.get('muid');
  }

  dismiss(){
    this.vievCtrl.dismiss();
  }

}
