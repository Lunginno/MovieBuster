import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, SubjectLike, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PpService {
  private   UserLoggedIn: boolean = false;
  private loggedInEmail: string = '';
  private token: string | null = null;
  authChanged = new Subject<boolean>();

private authStatusListener = new BehaviorSubject<boolean>(false);

  constructor() { }
  login(email: string, token: string): void {

    this.UserLoggedIn = true;
    this.token = token;
    this.loggedInEmail = email;
    localStorage.setItem('loggedInUserEmail', email);
    localStorage
    this.authChanged.next(true);
  }
  
  logout(): void {
    this.UserLoggedIn = false;
    this.loggedInEmail = '';
    localStorage.removeItem('loggedInUserEmail');
  }

  // Method to retrieve the token
  getToken(): string | null {
    return this.token;
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.token; // Returns true if token is not null or undefined
  }

  // Method to get the authentication status listener as an observable
  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  // Method to check if the user is logged in
  getIsLoggedIn(): boolean {
    return this.UserLoggedIn;
    // return true;
  }

  // Method to get the logged-in user's email
  getLoggedInUserEmail(): string {
    return this.loggedInEmail;
  }

  // Method to initialize authentication state from local storage
  initAuth(): void {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    const token = localStorage.getItem('token');
    if (userEmail && token) {
      this.login(userEmail, token);
    } else {
      console.log('No token found in local storage.');
    }
  }
}