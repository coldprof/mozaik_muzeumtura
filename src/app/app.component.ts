import { MuseumsPage } from './../pages/museums/museums';
import { NewsPage } from './../pages/news/news';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { GamePage } from '../pages/game/game';
import { LoginModalComponent } from '../components/login-modal/login-modal';
import { File } from "@ionic-native/file";
import { AlertController } from "ionic-angular";
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mycontent') nav: NavController
  rootPage:any = TabsPage;
  aktualisPage;
  muzeumokPage;
  jatekPage;
  tabPage;
  modalCtrl: any;
  baseURL: string = "";
  userData: any = {};
  login:number=0;




  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController, public file: File, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      splashScreen.hide();
      this.modalCtrl=modalCtrl;


      statusBar.styleDefault();


     /*  let splash = modalCtrl.create(Splash);
            splash.present(); */





    });

    this.aktualisPage = NewsPage;
    this.muzeumokPage = MuseumsPage;
    this.jatekPage = GamePage;
    this.tabPage = TabsPage;
    this.baseURL = this.file.dataDirectory;
    this.checkFiles()
  }


  checkFiles() {
    this.file
      .checkFile(this.baseURL, "userData.txt")
      .then(v => this.checkUser())
      .catch(z =>
        this.file.writeFile(
          this.baseURL,
          "userData.txt",
          JSON.stringify({ userId: 0, token: 0 }),
          { replace: true }
        )
      );
    }

  openLogin(){
    let logModal = this.modalCtrl.create(LoginModalComponent);
    logModal.onDidDismiss(data => {

      this.login=1
    this.nav.setRoot(TabsPage, { selectedTab: 2 });
    });
    logModal.present();
  }

  presentAlert(t, z) {
    let alert = this.alertCtrl.create({
      title: t,
      subTitle: z,
      buttons: ["Bezárás"],
      cssClass: 'alertclass'
    });
    alert.present();
  }


  openLogout(){
    this.file.writeFile(
      this.baseURL,
      "userData.txt",
      JSON.stringify({ userId: 0, token: 0 }),
      { replace: true }
    )

    this.file.writeFile(this.baseURL, "stickList.txt", "[]",
    {
      replace: true
    })
    this.login=0
    this.update()
  }

  checkUser() {
    this.file.readAsText(this.baseURL, "userData.txt").then(g => {
      this.userData = JSON.parse(g);
      if (this.userData.userId != 0) {


      }
    });
  }

  openPage(p, z) {
    /* this.nav.push(TabsPage, { selectedTab: z }); */
   /*   this.rootPage = p; */

   this.nav.setRoot(TabsPage, { selectedTab: z });
   /* this.nav.setRoot(this.tabPage.tab3Root) */
  }

  update(){
    this.nav.setRoot(this.nav.getActive().component);
  }
}

