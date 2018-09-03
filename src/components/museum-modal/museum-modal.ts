import { Component, Input } from '@angular/core';

import { NavParams, ViewController} from 'ionic-angular';
import { TruncateCharactersPipe } from '../../pipes/truncatePipe';
import { SafePipe } from '../../pipes/safePipe';

import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MuseumModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'museum-modal',
  templateUrl: 'museum-modal.html',
  providers: [TruncateCharactersPipe, SafePipe]
})
export class MuseumModalComponent {
  @Input() text: string;
  @Input() limit: number = 40;
  truncating = true;
  dist:any='z';
  gMap:any;
  museum: any;
  picURL:string = "";
  userLat:any;
  userLong:any;
  km:string="";
  fs:string="font-size:14px;";
  constructor(public params: NavParams, public vievCtrl: ViewController, private geolocation: Geolocation) {
    this.museum =  params.get("museum");
    this.picURL =  params.get("picURL");
    console.log(this.museum);
    this.text=this.museum.description;
    this.getCurrentPos()
    this.gMap="https://maps.google.com/maps?q=0,0&hl=es;z=14&amp;output=embed";

  }



  dismiss(){
    this.vievCtrl.dismiss();
  }

getCurrentPos(){
  this.geolocation.getCurrentPosition().then((resp) => {
    this.userLat = resp.coords.latitude;
    this.userLong = resp.coords.longitude;
    if(this.museum.longitude==0 || this.museum.latitude==0){
      this.dist="Nem meghatározható a távolság!";
    }else{
    this.dist=this.getDistanceFromLatLonInKm(this.museum.longitude, this.museum.latitude, resp.coords.latitude, resp.coords.longitude ).toFixed(1);
    this.km="km";
    this.fs="font-size:18px;"
  }
   }).catch((error) => {
     console.log('Error getting location', error);
     this.dist="Nincs bekapcsolva a helymeghatározás a készüléken!"

   });
  }
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

}
