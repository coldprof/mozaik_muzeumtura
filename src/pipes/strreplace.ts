import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'strReplace'
})

@Injectable()
export class ReplacePipe implements PipeTransform {

 transform(items: any[], field: any, value: any): any[] {

  /*   value = value.replace(/\\'/g, '\'');
    value = value.replace(/\\"/g, '"');
    value = value.replace(/\\0/g, '\0');
    value = value.replace(/\\\\/g, '\\'); */
    return JSON.parse(value);
 }
}
