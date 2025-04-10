import { Injectable } from '@angular/core';
import { IUser, IUserRegister } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: IUser | null = null;

  constructor(private http: HttpClient) {}

  registerUser(user: IUserRegister): Observable<string> {
    return this.http.post(API.registration, user, {responseType: 'text'});
  }

   authUser(user: IUser): Observable<string>  {
   return this.http.post<string>(API.auth, user);
  }
    
  // authUser(user: IUser): void  {
  //   this.http.post(API.auth, user).subscribe();
  // }

  getUser(): IUser {
    if (!this.currentUser) {
    const sessionUser: IUser = 
    JSON.parse(sessionStorage.getItem('AngularTourUser'));
    if(sessionUser) {
      this.currentUser = sessionUser
    } else {
      return null
    }
    }
    
       return this.currentUser
  }

  setUser(user: IUser) {
    this.currentUser = user;
    sessionStorage.setItem('AngularTourUser', JSON.stringify(user));
  }
 
}