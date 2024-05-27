import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PpService {
  private UserLoggedIn: boolean = false;
  private loggedInEmail: string = '';
  private userId: number | null = null; // Add a userId field
  private token: string | null = null;
  authChanged = new Subject<boolean>();

  private authStatusListener = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initAuth();
  }

  login(email: string, token: string): void {
    this.UserLoggedIn = true;
    this.token = token;
    this.loggedInEmail = email;
    localStorage.setItem('loggedInUserEmail', email);
    localStorage.setItem('token', token); // Store the token in localStorage
    this.userId = this.extractUserIdFromToken(token); // Extract and store the user ID
    this.authStatusListener.next(true);
  }

  logout(): void {
    this.UserLoggedIn = false;
    this.loggedInEmail = '';
    this.token = null;
    this.userId = null; // Clear the user ID
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('token'); // Remove the token from localStorage
    this.authStatusListener.next(false);
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token; // Returns true if token is not null or undefined
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  getIsLoggedIn(): boolean {
    return this.UserLoggedIn;
  }

  getLoggedInUserEmail(): string {
    return this.loggedInEmail;
  }

  initAuth(): void {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    const token = localStorage.getItem('token');
    if (userEmail && token) {
      this.UserLoggedIn = true;
      this.loggedInEmail = userEmail;
      this.token = token;
      this.userId = this.extractUserIdFromToken(token); // Extract and store the user ID
      this.authStatusListener.next(true);
    } else {
      console.log('No token found in local storage.');
    }
  }

  getUserId(): number | null {
    return this.userId;
  }

  private extractUserIdFromToken(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || null; // Assuming the user ID is stored in the "id" field
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
