import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser:any

  private url = 'http://localhost:3000/signupUsersList';

  constructor(private http:HttpClient) { }

  login(email:string, password:string):void{
    if(email==='groupB@gmail.com' && password==='12334'){
      this.currentUser={
        email:email
      };
      console.log(this.currentUser);
    }else{
      console.log("user not found");
    }
  }

  getCurrentUser(): any{
    return this.currentUser;
  }
}
