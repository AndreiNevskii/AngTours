import { Component, inject } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import {TableModule} from 'primeng/table';
import { ITour } from '../../models/tours';
import {MatSortModule} from '@angular/material/sort';




@Component({
  selector: 'app-basket',
  imports: [AsyncPipe, TableModule, DatePipe],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent { 
 basketItems$ = inject(BasketService).basketStore$;
 

 constructor(private basketService: BasketService) {}

removeRow(ev: Event, item: ITour): void {this.basketService.removeItemFromBasket(item) }
}
