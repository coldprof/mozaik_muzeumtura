import { GameService } from "./../../services/game.service";
import { Component, OnInit } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  LoadingController
} from "ionic-angular";
import { Http } from "@angular/http";
import { File } from "@ionic-native/file";
import { MuseumsService } from "../../services/museum.service";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { LoginModalComponent } from "../../components/login-modal/login-modal";
import { Network } from "@ionic-native/network";
import { AlertController } from "ionic-angular";
import { MyApp } from "../../app/app.component";
import { CongratModalComponent } from "../../components/congrat-modal/congrat-modal";

@Component({
  selector: "page-game",
  templateUrl: "game.html"
})
export class GamePage implements OnInit {

  userData: any = {};
  token: string = "";
  uid: number = 0;
  stick: Array<any> = [];
  sticker: Array<any> = [];
  pajzsok: Array<string> = [];
  matricaNum: number = 0;
  aktiv: number = 0;
  inaktiv: number = 12;
  baseURL: string = "";
  barcodeD: string = "";
  localStickers: Array<any> = [];
  waitingStickers: Array<any> = [];
  stickerData: Array<any> = [];
  muzeums: Array<object> = [];
  conntype: string = "";
  waiters: number = 0;
  proba: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public jatek: GameService,
    public modalController: ModalController,
    public file: File,
    public barcodeScanner: BarcodeScanner,
    public http: Http,
    public museumsService: MuseumsService,
    private _net: Network,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public myapp: MyApp
  ) {
    this.baseURL = this.file.dataDirectory;


  }

  ngOnInit() {
    this.checkNet();
    this.checkUserFile();

    /* ellenőrizzük a fájlokat, ha nincs beállítjuk */

  }

  checkUserFile() {
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
    checkStickerFile() {
    this.file
      .checkFile(this.baseURL, "stickList.txt")
      .then(v => this.checkLocalStickers())
      .catch(z =>
        this.file.writeFile(this.baseURL, "stickList.txt", "[]", {
          replace: true
        })
      );
    }

    checkWaitingFile(){
    this.file
      .checkFile(this.baseURL, "waitingStickers.txt")
      .then(v => this.checkWaitingStickers())
      .catch(z =>
        this.file.writeFile(this.baseURL, "waitingStickers.txt", "[]", {
          replace: true
        })
      );
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: "Betöltés..."
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  checkUser() {
    this.file.readAsText(this.baseURL, "userData.txt").then(g => {
      this.userData = JSON.parse(g);
      if (this.userData.userId != 0) {
        this.setUid(this.userData.userId);
        this.myapp.login=1

      }
    });
    this.checkStickerFile()
  }

  checkLocalStickers() {
    /* this.http.get(this.baseURL+"/stickList.txt") */

    this.file.readAsText(this.baseURL, "stickList.txt").then(res => {
      this.localStickers = JSON.parse(res);


      this.matricaNum = this.localStickers.length;
      /*  if(this.sticker[0]==0){this.matricaNum=0} */
      console.log(JSON.stringify(this.localStickers));
      if (this.matricaNum > 36) {
        this.matricaNum = 36;
      }
      if (this.matricaNum == 0) {
        this.aktiv = 0;
        this.inaktiv = 12;
      }
      if (this.matricaNum <= 12) {
        this.aktiv = this.matricaNum;
        this.inaktiv = 12 - this.aktiv;
      }
      if (this.matricaNum > 12 && this.matricaNum <= 24) {
        this.aktiv = this.matricaNum - 12;
        this.inaktiv = 12 - this.aktiv;
      }
      if (this.matricaNum >= 25) {
        this.aktiv = this.matricaNum - 24;
        this.inaktiv = 12 - this.aktiv;
      }


      this.stickerList(this.uid);
    });
    this.checkWaitingFile();
  }

  checkWaitingStickers() {
    this.file.readAsText(this.baseURL, "waitingStickers.txt").then(res => {
    /*   this.proba="lefut johelyen"; */
      this.waitingStickers = JSON.parse(res);
      this.waiters = this.waitingStickers.length;

    });


    this.presentLoadingDefault();
  }

  getMuseumName(id) {
    let g: any;
    this.museumsService.getAll().then(tr => {
      this.muzeums = tr as Array<object>;
      g = this.muzeums.filter(x => x["id"] == id);
      return g[0].qr;
    });
  }



  addLocalStickers(qr) {
    this.checkNet();
    let g: any;
    this.museumsService.getAll().then(tr => {
      this.muzeums = tr as Array<object>;
      g = this.muzeums.filter(x => x["qr"] == qr);

      if (this.findWithAttr(g, "qr", qr) == -1) {
        console.log("bennejártam");
        this.presentAlert("hibás kód!");
      } else {
        if (this.conntype != "none" && this.uid != 0) {
          this.stickersUpload(g[0].id, this.getD(), "life");
        } else {
          if (this.findWithAttr(this.waitingStickers, "mid", g[0].id) == -1) {
            this.waitingStickers.push({ mid: g[0].id, timestamp: this.getD() });
            this.file
              .writeFile(
                this.baseURL,
                "waitingStickers.txt",
                JSON.stringify(this.waitingStickers),
                { replace: true }
              )
              .then(v => {
                this.checkWaitingStickers();
              });
          } else {
            this.presentAlert("Ezt a matricát már megszerezted!");
          }
        }
      }
    });
  }

  uploadWaiting() {
    if (this.uid != 0) {
      this.checkNet();
      if (this.conntype != "none") {
        this.waitingStickers.forEach(res => {
          this.stickersUpload(res.mid, res.timestamp, "wait");
        });
      } else {
        this.presentAlert("Nincs internetkapcsolat");
      }
    } else {
      this.userLoginModal();
    }
  }

  stickersUpload(muid, time, mode) {
    this.proba = mode;
    this.jatek
      .post("http://www.mozaikmuzeumtura.hu/app/updatestickers_uj", {
        uid: this.uid,
        stickers: [{ mid: muid, timestamp: time }]
      })
      .then(res => {
        this.stickerList(this.uid);
        if (this.findWithAttr(this.localStickers, "mid", muid) == -1) {
        } else {
          this.presentAlert(
            "Ezt a matricát már megszerezted, de a látogatásod időpontját elmentettük!"
          );
        }
        if (mode == "wait") {
          this.file
            .writeFile(this.baseURL, "waitingStickers.txt", "[]", {
              replace: true
            })
            .then(v => {
           this.checkWaitingStickers();
           this.update()

            });
        }
      });
  }

  getD() {
    let i = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    return i;
  }




  checkNet() {
    this.conntype = this._net.type;
  }

  scanData() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        console.log("Barcode data", barcodeData);
        this.barcodeD = barcodeData.text;
        this.addLocalStickers(this.barcodeD);

        this.congratServ(this.barcodeD)

      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  stickerList(id) {
    this.jatek
      .post("http://www.mozaikmuzeumtura.hu/app/updatestickers_uj", { uid: id })
      .then(res => {
        this.sticker = res as Array<number>;
        this.sticker.forEach(val => {
          if (this.findWithAttr(this.localStickers, "mid", val.mid) == -1) {
            this.localStickers.push({ mid: val.mid, timestamp: val.timestamp });
            this.file.writeFile(
              this.baseURL,
              "stickList.txt",
              JSON.stringify(this.localStickers),
              { replace: true }
            );
          } else {
          }

      this.matricaNum = this.localStickers.length;
      /*  if(this.sticker[0]==0){this.matricaNum=0} */
      console.log(JSON.stringify(this.localStickers));
      if (this.matricaNum > 36) {
        this.matricaNum = 36;
      }
      if (this.matricaNum == 0) {
        this.aktiv = 0;
        this.inaktiv = 12;
      }
      if (this.matricaNum <= 12) {
        this.aktiv = this.matricaNum;
        this.inaktiv = 12 - this.aktiv;
      }
      if (this.matricaNum > 12 && this.matricaNum <= 24) {
        this.aktiv = this.matricaNum - 12;
        this.inaktiv = 12 - this.aktiv;
      }
      if (this.matricaNum >= 25) {
        this.aktiv = this.matricaNum - 24;
        this.inaktiv = 12 - this.aktiv;
      }
        });
      });
  }

  setUid(uid) {
    this.uid = uid;
  }

  userLoginModal() {
    let logModal = this.modalController.create(LoginModalComponent);
    logModal.onDidDismiss(data => {
      this.setUid(data.uid);
      this.stickerList(data.uid);
      this.myapp.login=1
    });
    logModal.present();
  }
  openReg() {
    window.open(
      "http://www.mozaikmuzeumtura.hu/users/registration",
      "_system",
      "location=yes"
    );
  }


  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  presentAlert(z) {
    let alert = this.alertCtrl.create({
      title: "Hiba",
      subTitle: z,
      buttons: ["Bezárás"]
    });
    alert.present();
  }

  congratServ(m){
    let g: any;

    this.museumsService.getAll().then(tr => {
      this.muzeums = tr as Array<object>;
      g = this.muzeums.filter(x => x["qr"] == m);


      this.congrattModal(g[0].id)
    })
  }

  congrattModal(m) {

    let congratModal = this.modalController.create(CongratModalComponent, {
      muid: m
    });
    congratModal.onDidDismiss(data => {
      this.update()
    });

    congratModal.present();
  }





update(){
  this.navCtrl.setRoot(this.navCtrl.getActive().component);
}

}
