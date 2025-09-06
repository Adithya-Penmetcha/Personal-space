import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  isAuthenticated() {
    return localStorage.getItem('token');
  }

  saveLoggedInUser(){
    localStorage.setItem('token','authorised user')
  }
}
