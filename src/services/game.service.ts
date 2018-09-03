import { Http } from '@angular/http';

import { Injectable } from '@angular/core';


@Injectable()
export class GameService{
  op:object={}


  constructor(public http: Http) {

    this.op={ headers: { "Content-Type": "application/json" }};
  }




    post(apiUrl: string, data: any = {} ) {
      return new Promise((resolve,reject)=>{
        this.http.post(apiUrl,JSON.stringify(data), this.op ).subscribe(res => {
           resolve(res.json());
            },
         );

        });
    }





}
