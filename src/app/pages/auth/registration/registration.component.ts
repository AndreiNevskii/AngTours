import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { IUserRegister } from '../../../models/user';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-registration',
  imports: [NgClass, FormsModule, ButtonModule, CheckboxModule, InputTextModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit{ 
  login: string;
  password: string;
  passwordRepeat: string;
  cardNumber: string;
  email: string;
  isRemember: boolean;
  labelText = "Сохранить пользователя в хранилище";  
  constructor(private userService: UserService,
    private messageService: MessageService) {}

  ngOnInit(): void 
  {}


  onAuth(ev: Event): void {
   const postObj = {login: this.login, password: this.password, email: this.email} as IUserRegister;
   this.userService.registerUser(postObj).subscribe(
    () => {this.initToast('success', 'Регистрация прошла успешно')
      //  this.messageService.add({ severity: 'success', detail: 'Регистрация прошла успешно' });
      },
    () => {this.initToast('error', 'Произошла ошибка')
      // this.messageService.add({ severity: 'error', detail: 'Произошла ошибка' });
    } 
   )
  }

  initToast(type: 'error' | 'success', text: string): void {
    this.messageService.add({ severity: type, detail: text, life: 3000 });
  }
} 