 import { Component } from '@angular/core';
 import { FullNamePipe } from '../../shared/pipes/fullName.pipe';
 import { CountTouristsPipe } from '../../shared/pipes/countTourists.pipe';
 import { TableModule } from 'primeng/table';
 import { IOrder } from '../../models/tours';




 @Component({
   selector: 'app-orders',
   imports: [FullNamePipe, CountTouristsPipe, TableModule],
   templateUrl: './orders.component.html',
   styleUrl: './orders.component.scss',
 })
 export class OrdersComponent {
  orders: IOrder[];

  }