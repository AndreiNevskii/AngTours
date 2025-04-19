import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import {CardModule} from 'primeng/card';
import { IFilterTypeLogic, ILocation, ITour } from '../../models/tours';
import { ActivatedRoute, Router } from '@angular/router';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive';
import { isValid} from 'date-fns';
import { Subject, takeUntil } from 'rxjs';
import { DialogModule} from 'primeng/dialog'
import { MapComponent } from '../../shared/components/map/map.component';
import { ICountryData, IWeatherData, IWeatherResponce } from '../../models/map'; 
import { DatePipe } from '@angular/common';
import { BasketService } from '../../services/basket.service';
import { MapService } from '../../services/map.service';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';






@Component({
  selector: 'app-tours',
  imports: [
    CardModule, 
    InputGroupModule, 
    InputGroupAddonModule, 
    ButtonModule, 
    InputTextModule, 
    SearchPipe, 
    FormsModule,
    HighlightActiveDirective,
    MapComponent,
    DialogModule, 
    DatePipe,
  
   
  
    // ConfirmDialog,
    // ToastModule, 
  
         ],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
  providers: [ConfirmationService, MessageService],
  

})
export class ToursComponent implements OnInit, OnDestroy{
    tours: ITour[] =[];
    toursStore: ITour[] =[];
    dateTourFilter: Date;
    typeTourFilter: IFilterTypeLogic = {key: "all"};
    destroyer = new Subject<boolean>();
    showModal = false;
    location: ILocation = null; 
    weatherData: IWeatherData= null;
    selectedTour: ITour = null;
    userLogin = inject(UserService).getUser()?.login;
     
      
    constructor(private toursService: ToursService,
      private route: ActivatedRoute,
      private router: Router,
      private mapService: MapService,
      private basketService: BasketService,
      // private confirmationService: ConfirmationService, 
      private messageService: MessageService,
      ) {}

     ngOnInit(): void {
 
        // this.toursService.tourType$.subscribe((tour) => {
        //    switch(tour.key) {
        //     case 'group': 
        //     this.tours = this.toursStore.filter((el) => el.type === 'group')  
        //     break;
        //     case 'single': 
        //     this.tours = this.toursStore.filter((el) => el.type === 'single')  
        //     break;
        //     case 'all': 
        //     this.tours = [...this.toursStore]  
        //     break;
            
        //   }
        // })

  //date
  // this.toursService.tourDate$.subscribe((date) => {
  //   this.tours = this.toursStore.filter((tour) => {
  //   if(isValid(new Date(tour.date))) {
  //  const tourDate = new Date(tour.date).setHours(0, 0, 0, 0);
  //  const calendarDate = new Date(date).setHours(0, 0, 0);
  //  return tourDate === calendarDate;
  //   }
  //   else {return false}
  // });

  // })

//Types
this.toursService.tourType$.pipe(takeUntil(this.destroyer)).subscribe((tour) => {
  console.log('tour', tour);
  this.typeTourFilter = tour;
  this.initTourFilterLogic();
 });

 //Date
 this.toursService.tourDate$.pipe(takeUntil(this.destroyer)).subscribe((date) => {
  console.log('****date', date);
  this.dateTourFilter = date;
  this.initTourFilterLogic();
 });
   

      this.toursService.getTours().subscribe((data) => {
           if(Array.isArray(data)) {
            this.tours = data;
              this.toursStore = [...data];
          }
        });

      }


  ngOnDestroy(): void {
    this.destroyer.next(true);
    this.destroyer.complete();
  }


   goToTour(item: ITour): void {
      this.router.navigate(['tour', item.id], {relativeTo: this.route});
    }


    searchTours (ev: Event): void {
      const target = ev.target as HTMLInputElement;
      const targetValue = target.value;
      this.tours = this.toursService.searchTours(this.toursStore, targetValue);
    }

    selectActive(index: number): void {
      const targetTour = this.tours.find((tour, i) => i === index);
      if(targetTour) {
        this.goToTour(targetTour);
      }
    } 

     initTourFilterLogic(): void {
      if(this.typeTourFilter) {
        switch(this.typeTourFilter.key) {
              case 'group': 
              this.tours = this.toursStore.filter((el) => el.type === 'group')  
              break;
              case 'single': 
              this.tours = this.toursStore.filter((el) => el.type === 'single')  
              break;
              case 'all': 
              this.tours = [...this.toursStore]  
              break;
          }}
        if(this.dateTourFilter) {
            this.tours = this.tours.filter((tour) => {
            if(this.dateTourFilter && isValid(new Date(this.dateTourFilter))) {
            const tourDate = new Date(tour.date).setHours(0, 0, 0, 0);
            const calendarDate = new Date(this.dateTourFilter).setHours(0, 0, 0);
            return tourDate === calendarDate;
            }
             else {return false}
            }); 
        }
     }

      getCountryDetail(ev: Event, code: string, tour: ITour): void {
        ev.stopPropagation();
        this.toursService.getCountryByCode(code).subscribe((data) => {
          if(data) {
            const countryInfo = data.countryData;
            console.log('countryInfo', countryInfo);
            this.location = {lat: countryInfo.latlng[0], lng: countryInfo.latlng[1]};
            this.selectedTour = tour;
            this.weatherData = data.weatherData;
            this.showModal = true;
           
          }
        }) 
      }

       removeTour(ev: Event, tour: ITour): void {
       ev.stopPropagation();
      this.toursService.deleteTourById(tour?.id).subscribe((data) =>
        {this.tours = data;
        this.toursStore = [...data];})
      
    }


      setItemToBasket(ev: Event, item: ITour): void {
        ev.stopPropagation();
        this.basketService.setItemToBasket(item);
       }
  
       removeItemFromBasket(ev: Event, item: ITour): void {
        ev.stopPropagation();
        this.basketService.removeItemFromBasket(item);
      }
  
  //  confirm(event: Event) {
  //       this.confirmationService.confirm({
  //           target: event.target as EventTarget,
  //           message: 'Do you want to delete this record?',
  //           header: 'Danger Zone',
  //           icon: 'pi pi-info-circle',
  //           rejectLabel: 'Cancel',
  //           rejectButtonProps: {
  //               label: 'Cancel',
  //               severity: 'secondary',
  //               outlined: true,
  //           },
  //           acceptButtonProps: {
  //               label: 'Delete',
  //               severity: 'danger',
  //           },

  //           accept: () => {
  //               this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
  //           },
  //           reject: () => {
  //               this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
  //           },
  //       });
  //   }




  }

