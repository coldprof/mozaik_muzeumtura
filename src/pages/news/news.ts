import { Component, Output, OnInit, Input } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { File } from "@ionic-native/file";
import { Http } from "@angular/http";
import { NewsService } from "../../services/new.service";
import { Network } from "@ionic-native/network";
import { AlertController } from "ionic-angular";
import { TruncateCharactersPipe } from '../../pipes/truncatePipe';
import { NewsModalComponent } from '../../components/news-modal/news-modal';



@Component({
  selector: "page-news",
  templateUrl: "news.html",
  providers: [TruncateCharactersPipe]
})
export class NewsPage implements OnInit {
  fileObj: string;
  f: any;
  @Input() limit: number = 40;
  truncating = true;


  @Output()
  hirek: Array<any> = [];
  @Output()
  news: Array<any> = [];
  baseURL: string = "";
  conntype: string ="";
  frehs:boolean=false;


  constructor(
    public navCtrl: NavController,
    public file: File,
    public http: Http,
    public newsService: NewsService,
    private _net: Network,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalController:ModalController

  ) {
    this.baseURL = this.file.dataDirectory;

    this.conntype=this._net.type;



  }

  ionViewDidLoad(){

  }

  ngOnInit() {

    this.presentLoadingDefault()
  }




  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Betöltés...'
    });

    loading.present();

    setTimeout(() => {
      this.getNewsFromFile()
      loading.dismiss();
    }, 2000);
  }

  getNewsFromFile() {
    this.file.readAsText(this.baseURL, "news.txt").then(g => {
      this.hirek = JSON.parse(g);

      this.hirek.forEach(res => {
        res["kep"] = JSON.parse(res["images"]);
        this.news.push({
          kep: "http://www.mozaikmuzeumtura.hu/" + res["kep"]["image_intro"],
          cim: res["title"],
          introtext: res["introtext"],
          fulltext: res["fulltext"],
          created: res["created"]
        });
      });
      if(this.news.length<5){
        this.update()
      }
    });

   /*  */
  }



  newsModal(news) {
    let newsModal = this.modalController.create(NewsModalComponent, {
      news: news
    });
    newsModal.present();
  }

  showAlert(z) {
    const alert = this.alertCtrl.create({
      title: "Figyelem!",
      subTitle: z,
      buttons: ["OK"]
    });
    alert.present();
  }
  update(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  openMMT() {
    window.open(
      "http://www.mozaikmuzeumtura.hu/",
      "_system",
      "location=yes"
    );
  }
}

