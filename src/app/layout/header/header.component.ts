import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IUser } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import {OverlayBadgeModule} from 'primeng/overlaybadge';
import { Observable } from 'rxjs';
import { ITour } from '../../models/tours';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-header',
  imports: [DatePipe, MenubarModule, ButtonModule, OverlayBadgeModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  
})
export class HeaderComponent implements OnInit, OnDestroy {
  dateTime: Date;
  menuItems: MenuItem[] = [];
  user: IUser;
  logoutIcon = 'pi pi-user';
  basketStore$: Observable<ITour[]> = null;

  constructor(private userService: UserService, 
    private router: Router, 
    private ngZone: NgZone,
    private basketservice: BasketService)  {}

  ngOnInit(): void {
    this.basketStore$ = this.basketservice.backetStore$;

    this.user = this.userService.getUser();
    this.menuItems = this.initMenuItems();
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.dateTime = new Date();
      }, 1000);
    })

  }  ngOnDestroy() {}

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Туры',
        routerLink: ['/tours']
      },
      {
        label: 'Настройки',
        routerLink: ['/tours/settings']
      },
      {
        label: 'Заказы',
        routerLink: ['/orders']
      }
    ];
  } 


  logOut(): void {
    this.userService.setUser(null);
    this.router.navigate([`/auth`]);
  }

  hoverLogoutBtn(val: boolean): void {
    this.logoutIcon = val? 'pi pi-sign-out' : 'pi pi-user';
  }

}