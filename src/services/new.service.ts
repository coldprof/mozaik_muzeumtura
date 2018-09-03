import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';


@Injectable()
export class NewsService {
  baseURL:string="";

  str: string="";
  conOnline: boolean = navigator.onLine;
  uri:string;
  container: Array<any> = [];
  hirek: Array<any> = [];
  news: Array<any> = [];
  fix:boolean=false;

  /* ConOnline: boolean = navigator.onLine; */
  constructor(public http:Http, public file: File, public transfer: FileTransfer, ){

    this.baseURL=this.file.dataDirectory;


 }
 fileTransfer: FileTransferObject = this.transfer.create();
 newsCheck(){
   this.file.checkFile(this.baseURL, "news.txt").then(z=>{
     if(z==true){

      }else{
         this.getAll()
      }
   })

 }


getAll() {
    this.http.get("http://www.mozaikmuzeumtura.hu/app/news").subscribe( res => {

      this.file.writeFile(this.baseURL, "news.txt", res["_body"] ,{replace:true})
     /*   this.container=JSON.parse(res["_body"]);
     let i:number=1;
      this.container.forEach(res=>{
        res["kep"]=JSON.parse(res["images"]);
       this.fileTransfer.download("http://www.mozaikmuzeumtura.hu/"+res["kep"]["image_intro"], this.baseURL + i+'.jpg').then((entry) => {
                console.log('download complete: ' + entry.toURL());
              }, (error) => {

              });
              i++;
      }) */

    });

}




}
