import { Component, inject } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import {TableModule} from 'primeng/table';
import { ITour } from '../../models/tours';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';





@Component({
  selector: 'app-basket',
  imports: [AsyncPipe, TableModule, DatePipe, ToastModule, ButtonModule, ConfirmDialogModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  providers: [MessageService, ConfirmationService]
})


export class BasketComponent { 
 basketItems$ = inject(BasketService).basketStore$;
 

 constructor(private basketService: BasketService,
  private confirmationService: ConfirmationService,
  private messageService: MessageService,
 
 ) {}

 //removeRow(ev: Event, item: ITour): void {this.basketService.removeItemFromBasket(item) }



  removeRow(ev: Event, item: ITour): void  {
        ev.stopPropagation();
        this.confirmationService.confirm({
         
                   message: 'Вы действительно хотите удалить этот тур?',
                     header: 'Внимание',
                     icon: 'pi pi-info-circle',
                     rejectLabel: 'Cancel',
                     rejectButtonProps: {
                        label: 'Нет',
                        severity: 'secondary',
                         outlined: true,
                     },
                    acceptButtonProps: {
                        label: 'Да, удалить',
                         severity: 'danger',
                    },
            
               accept: () => {
                   this.messageService.add({ severity: 'info', summary: 'Подтверждение', detail: 'Информация о туре удалена' });
                   this.basketService.removeItemFromBasket(item);
               },
               reject: () => {
                   this.messageService.add({ severity: 'error', summary: 'Отмена', detail: 'Вы отказались удалять' });
               },
           });
       }

     }
