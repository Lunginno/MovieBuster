import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PpService } from 'src/app/services/pp.service';
import { WatchlistService } from 'src/app/services/watchlist/watchlist.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  //we use !: to tell the compiler that the formgroup is not null or undefined
public signIn !: FormGroup
public UserLoggedIn: boolean = false;
  public userEmail: string = '';



constructor(private http: HttpClient, private router:Router, private formBuilder: FormBuilder, private authsev:PpService, private watchlist:WatchlistService){}

ngOnInit():void{
  //Initialize the signIn form group with email and password form controls
  this.signIn=this.formBuilder.group({
    email:["",Validators.required],
    password:["",Validators.required]
  })
  
}

// it is triggered when a user clicks the submit login form
signInForm()
{
  //Sends HTTP GET request to retrieve user data
  this.http.get<any>("http://localhost:3000/signupUsersList").subscribe(resp=>{
    //Response received, search for user with provided email and password
    const user=resp.find((details:any)=>{
      return details.email === this.signIn.value.email && details.password === this.signIn.value.password
    
    });
    if(user){
      alert('Login Successful');
      this.userEmail = this.signIn.value.email;
      this.UserLoggedIn = true;
      this.authsev.login(this.userEmail);
      this.watchlist.clearList();
      console.log(this.userEmail)
      this.signIn.reset();
      this.router.navigate(["home"])
      console.log(this.UserLoggedIn);
    }else{
      alert("user not found")
    }
  })
  
}

}

