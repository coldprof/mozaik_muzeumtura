import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
  cat: Array<any> = [];
 transform(items: any[], field: string, value: any): any[] {
   if (!items) return [];

  /*  this.cat.push(
     {
       id: items["id"],
       cat: items["categories"]

     }
   ) */

   return items.filter(it => it[field].includes(value) );

 }
}
