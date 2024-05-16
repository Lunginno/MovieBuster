import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PpService {
  private   UserLoggedIn: boolean = false;
  private loggedInEmail: string = '';

  constructor() { }
  login(email: string): void {
    this.UserLoggedIn = true;
    this.loggedInEmail = email;
    localStorage.setItem('loggedInUserEmail', email);
  }
  
  logout(): void {
    this.UserLoggedIn = false;
    this.loggedInEmail = '';
    localStorage.removeItem('loggedInUserEmail');
  }

  getIsLoggedIn(): boolean {
    // return this.UserLoggedIn;
    return true;
  }

  getLoggedInUserEmail(): string {
    return this.loggedInEmail;
  }

  initAuth(): void {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    if (userEmail) {
      this.login(userEmail);
    }
  }

}
