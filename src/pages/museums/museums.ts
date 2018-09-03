import { OrderByPipe } from "../../pipes/orderBy";
import { SearchFilterPipe } from "../../pipes/searchfilter";
import { Component, Output, DoCheck, ViewChild } from "@angular/core";
import { NavController, NavParams, ModalController, LoadingController, Events } from "ionic-angular";
import { MuseumsService } from "../../services/museum.service";
import { CategoryModalComponent } from "../../components/category-modal/category-modal";
import { MuseumModalComponent } from "../../components/museum-modal/museum-modal";
import { Http } from "@angular/http";

import { Content } from 'ionic-angular';

@Component({
  selector: "page-museums",
  templateUrl: "museums.html",
  providers: [OrderByPipe, SearchFilterPipe]
})
export class MuseumsPage implements DoCheck {
  @ViewChild(Content) content: Content;
  @Output() muzeums: Array<object> = [];
  @Output() cityList: Array<object> = [];

  isLoggedIn = true;
  filt: string = "";
  theme: number = 3;
  sr:string="";
  city: string = "";
  elozo: string = "";
  picURL: string = "./assets/kulsobelso/";
  items:Array<any> = [];
  scrollArray:Array<any> = [];
  cItems:Array<any> = [];
  categories:Array<object> = [{name:"", pic:""},
    {name:"Képzőművészet", pic:"tema_ikonok_kepzomuveszet_aktiv.png"},
    {name:"Iparművészet, népművészet", pic:"tema_ikonok_iparmuveszet_aktiv.png"},
    {name:"Természettudomány", pic:"tema_ikonok_termeszettudomany_aktiv.png"},
    {name:"Gyermekjáték, pedagógia", pic:"tema_ikonok_gyerek_aktiv.png"},
    {name:"Ipar-, technika- és közlekedéstörténet", pic:"tema_ikonok_ipar_aktiv.png"},
    {name:"Történelem, régészet", pic:"tema_ikonok_tortenelem_aktiv.png"},
    {name:"Irodalom, színháztörténet", pic:"tema_ikonok_irodalom_aktiv.png"},
    {name:"Egyházi gyűjtemény", pic:"tema_ikonok_egyhazi_aktiv.png"},
    {name:"Zene", pic:"tema_ikonok_zene_aktiv.png"},
    {name:"Gasztronómia", pic:"tema_ikonok_gasztronomia_aktiv.png"},
    {name:"Vár, kastély", pic:"tema_ikonok_var_aktiv.png"},
    {name:"Néprajz, helytörténet", pic:"tema_ikonok_neprajz_aktiv.png"},
    {name:"Mezőgazdaság, agrártörténet", pic:"tema_ikonok_mezogazdasag_aktiv.png"},
    {name:"Sport és szabadidő", pic:"tema_ikonok_sportszabadido_aktiv.png"}
  ]

constructor( public navCtrl: NavController,
  public navParams: NavParams,
  public museumsService: MuseumsService,
  public modalController: ModalController,
  public loadingCtrl: LoadingController,
  public events: Events, public http:Http){


   /*  if (this._net.type == "none") {
      this.picURL ="./assets/kulsobelso/";}else{
        this.picURL = "";
      }
 */

      this.getMuseums();



}

ngDoCheck() {
 /*  this.presentLoadingDefault(); */
}

scrollToTop() {
  this.content.scrollToTop();
}

presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: "Betöltés..."
  });

  loading.present();

  setTimeout(() => {
    this.scrollToTop()
    loading.dismiss();
  }, 500);
}

presentLoadingCity() {
  let loading = this.loadingCtrl.create({
    content: "Betöltés..."
  });

  loading.present();

  setTimeout(() => {
    this.setFilt('telepules');
    this.scrollToTop()
    loading.dismiss();
  }, 3000);
}


getSrc(ev: any) {
  // Reset items back to all of the items
  this.filt="";

  // set val to the value of the searchbar
  const val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.setFilt('searc')

    this.items = this.items.filter((item) => {

      return (item["name"].toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.setFilt("")
    this.getMuseums();
  }
}

setSr(v){
  this.sr=v;
}
setFilt(v){
  this.filt=v;
  if(v=='telepules' || v=="searc"){

  }else{
  this.presentLoadingDefault()
}
}


  getMuseums(){
    this.museumsService.getAll().then(tr => {
      this.items = tr as Array<object>
      this.muzeums = tr as Array<object>;
      for (let i = 0; i < 2; i++) {
        this.scrollArray.push( this.muzeums[i] );
      }

      this.muzeums.forEach(res => {
        if (this.findWithAttr(this.cityList, "city", res["city"]) == -1) {
          this.cityList.push({
            city: res["city"],
            museums: this.filterMuseumsOfcity(res["city"])
          });
        }
      });
    });


  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        this.scrollArray.push( this.muzeums[this.scrollArray.length] );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  filterMuseumsOfcity(v) {
    return this.muzeums.filter(x => x["city"] == v);
  }

  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  setTheme(v) {
    this.theme = v;
    this.presentLoadingDefault()
    return this.theme;
  }

  catModal(t) {
    let catModal = this.modalController.create(CategoryModalComponent, {
      thm: t
    });
    catModal.onDidDismiss(data => {
      this.setTheme(data.thma);
    });

    catModal.present();
  }

  musModal(museum, picURL) {
    let musModal = this.modalController.create(MuseumModalComponent, {
      museum: museum,
      picURL: this.picURL
    });
    musModal.present();
  }

  update(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }




}
