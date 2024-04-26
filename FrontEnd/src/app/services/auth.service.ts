import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000/signupUsersList';

  constructor(private http:HttpClient) { }

  signIn() : Observable<any>
  {
    return this.http.get<any>(this.url);
  }

  signUp(data:any)
  {
    const info = {'content-type': 'app/json'}
    const body = JSON.stringify(data);
    return this.http.post(this.url + 'data', body)
  }
}
