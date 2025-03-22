import { Component, OnInit, OnDestroy} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-authorization',
  imports: [NgClass, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
})
export class AuthorizationComponent implements OnInit, OnDestroy { 
  login: string;
  password: string;
  
  constructor(private userService: UserService,
    private messageService: MessageService,
     private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  // onAuth(): void {
  //   const user: IUser = {
  //     login: this.login,
  //     password: this.password
  //   }
  //   this.userService.authUser(user);
  //   this.router.navigate(['tickets']);
  // }

 onAuth(): void {
    const user: IUser = {login: this.login, password: this.password};
   this.userService.authUser(user).subscribe(
    () => {
      this.userService.setUser(user);
      this.router.navigate(['tours'])},
    () => {this.initToast('error', 'Произошла ошибка')} 
   )
  }

  initToast(type: 'error' | 'success', text: string): void {
    this.messageService.add({ severity: type, detail: text, life: 3000 });

    
  }

 
}
