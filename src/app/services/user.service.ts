import { Injectable } from '@angular/core';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userStorage: IUser[] =[];
  private currentUser: IUser | null = null;

  constructor() { }

  private getUser(login: string): IUser | null {
    return this.userStorage.find((user) => login === user.login) || null;
  }

  addUser(user: IUser, isRememberMe?: boolean): true | string {
    if (this.getUser(user.login)) {
      return "Пользователь уже существует";
    }
    this.userStorage.push(user);
    return true;
  } 

  checkUser(login: string): boolean {
    return !!this.getUser(login);
  }

}