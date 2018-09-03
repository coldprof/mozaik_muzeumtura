import { Component } from '@angular/core';

/**
 * Generated class for the RegisztracioComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'regisztracio',
  templateUrl: 'regisztracio.html'
})
export class RegisztracioComponent {

  text: string;

  constructor() {
    console.log('Hello RegisztracioComponent Component');
    this.text = 'Hello World';
  }

}
