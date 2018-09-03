import { Component } from '@angular/core';
import { NavParams, ViewController} from 'ionic-angular';
/**
 * Generated class for the CategoryModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'category-modal',
  templateUrl: 'category-modal.html'
})
export class CategoryModalComponent {

  theme: number;

  constructor(public params: NavParams, public vievCtrl: ViewController) {
    console.log('Hello CategoryModalComponent Component');
    this.theme = params.get("thm");
  }

  setTheme(v){
    this.theme=v;
    let data = { "thma" : this.theme };
    this.vievCtrl.dismiss( data );
    return this.theme;
  }



}
