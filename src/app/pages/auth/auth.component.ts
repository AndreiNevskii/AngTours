import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-auth',
  imports: [AuthorizationComponent, RegistrationComponent, TabsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, OnDestroy{
  ngOnInit(): void {
      console.log('init')
  }

  ngOnDestroy(): void {
    console.log('destr')

  }

}
