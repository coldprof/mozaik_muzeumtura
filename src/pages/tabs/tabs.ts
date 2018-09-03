import { NewsPage } from './../news/news';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs, AlertController } from 'ionic-angular';
import { MuseumsPage } from '../museums/museums';
import { GamePage } from '../game/game';
import { File } from "@ionic-native/file";
import { Http } from "@angular/http";
import { Network } from '@ionic-native/network';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  private selectedTab: number;
  baseURL: string = "";
  conntype: string ="";

  tab1Root = NewsPage;
  tab2Root = MuseumsPage;
  tab3Root = GamePage;

  constructor( public navCtrl:NavController, public navParams:NavParams, public file: File,
    public http: Http,  private _net: Network, public alertCtrl: AlertController) {
      this.baseURL = this.file.dataDirectory;

    this.conntype=this._net.type;
    if (this._net.type != "none") {
      this.getAll();
    } else {
      this.newsCheck();

    }

  }

  ionViewWillEnter() {
    if(this.selectedTab) {
      this.tabRef.select(this.selectedTab);
    }
  }




  newsCheck() {

    this.file
      .checkFile(this.baseURL, "news.txt")
      .then(z => {

        this.selectedTab = this.navParams.get('selectedTab') || 0;
      })
      .catch(v => {
        this.showAlert("A aktualitások megjelenítéséhez az első alkalommal iternetkapcsolat szükséges!"); //kéne frissíteni az oldalt
      });
  }

  getAll() {
    this.http.get("http://www.mozaikmuzeumtura.hu/app/news").subscribe(res => {
      this.file.writeFile(this.baseURL, "news.txt", res["_body"], {
        replace: true
      });
      this.selectedTab = this.navParams.get('selectedTab') || 0;
    });
  }


  showAlert(z) {
    const alert = this.alertCtrl.create({
      title: "Figyelem!",
      subTitle: z,
      buttons: ["OK"]
    });
    alert.present();
  }

}
