 import { Pipe, type PipeTransform } from '@angular/core';
 import { OrderComponent } from '../../pages/order/order.component';
 import { IOrder } from '../../models/tours';


 @Pipe({
   name: 'fullName',
 })
 export class FullNamePipe implements PipeTransform {

   transform(personalData: IOrder['personalData']): string {
     return `${personalData.firstName}  ${personalData.lastName}`;
   }

 }
