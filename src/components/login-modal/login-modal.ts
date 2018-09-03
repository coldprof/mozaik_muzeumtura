
import { NavParams, ViewController} from 'ionic-angular';
import { Component } from '../../../node_modules/@angular/core';

import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';
import { GameService } from '../../services/game.service';
import { Network } from '@ionic-native/network';




@Component({
  selector: 'login-modal',
  templateUrl: 'login-modal.html'
})
export class LoginModalComponent {

  baseURL:string="";
  logURL:string ="http://www.mozaikmuzeumtura.hu/app/login";
  conntype: string ="";
  user={
    username:'',
    pass:''

  };
  constructor(public params: NavParams, public vievCtrl: ViewController,
    public jatek:GameService, public file:File, private _net: Network, private alertCtrl: AlertController) {

    this.baseURL=this.file.dataDirectory;
    this.conntype=this._net.type;
    if(this.conntype=="none"){
    this.presentAlert("Nincs internetkapcsolat!")
  }
  }

  logForm(){
    console.log(this.user);

    this.userLogin( {"username":this.user.username, "password":this.user.pass});


  }

  presentAlert(z) {
    let alert = this.alertCtrl.create({
      title: 'Hiba',
      subTitle: z,
      buttons: ['Bezárás']
    });
    alert.present();
  }

  userLogin(udata){
    this.jatek.post(this.logURL, udata).then(res=>{


      /* this.storag.set("access_token", res["access_token"]);
      this.storag.set("uid", res["uid"]); */
     if(res["access_token"]==0){
      this.presentAlert("Hibás belépési adatok!")
     }else{

     this.file.writeFile(this.baseURL, "userData.txt", JSON.stringify({"userId": res["uid"], "token": res["access_token"] }), {replace:true} )

      let data = { "uid" : res["uid"]};
      this.vievCtrl.dismiss( data );
    }

    })
  }

  openForgot() {
    window.open(
      "http://www.mozaikmuzeumtura.hu/users/forgot-password",
      "_system",
      "location=yes"
    );
  }


}
