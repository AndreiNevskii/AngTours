 import { Pipe, type PipeTransform } from '@angular/core';
 import { IOrder } from '../../models/tours';


 @Pipe({
  name: 'countTourists',
 })
 export class CountTouristsPipe implements PipeTransform {

   transform(orders: IOrder[], tourId: string): number {
     return orders.filter(order => order.tourId === tourId).length;
   }

 }
