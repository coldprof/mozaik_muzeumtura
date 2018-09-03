import { Http } from "@angular/http";
import { Injectable } from "@angular/core";





@Injectable()
export class MuseumsService {
  museums: Array<object> = [];
  mus: Array<any>=[];

  Murl:string = "./assets/museums.json";
  filter: string = "museums";
  ConOnline: boolean = navigator.onLine;
    constructor(public http:Http ){
    /*   if (this._net.type == "none") {
      this.Murl = "./assets/museums.json";}else{
        this.Murl = "http://www.mozaikmuzeumtura.hu/app/museums";
      } */

    }


  getAll(): Promise<any> {
    return new Promise((resolve, reject) =>{
      /* if(this.museums.length > 0){
        return resolve(this.museums);
      } */
      this.http.get(this.Murl)
      .forEach( res => {
        this.museums = res.json();

        resolve(this.museums);
      });
    });
  }
}
