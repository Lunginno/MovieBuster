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
  private token: string | undefined;
  private tokenExpirationTimer:any;



constructor(private http: HttpClient, private router:Router, private formBuilder: FormBuilder, private authsev:PpService, private watchlist:WatchlistService){}

ngOnInit():void{
  //Initialize the signIn form group with email and password form controls
  this.signIn=this.formBuilder.group({
    email:["",Validators.required],
    password:["",Validators.required]
  })

  const token = localStorage.getItem('token');
  if(token){
    this.authsev.login(this.userEmail, token);
  }else{
    this.router.navigate(['/login'])
  }
  
}
onEmailInput():void{
  const emailControl = this.signIn.get('email');
  const lowercaseEmail = emailControl?.value.toLowerCase();
  emailControl?.setValue(lowercaseEmail,{emitEvent:false})
}

// it is triggered when a user clicks the submit login form
signInForm()
{
  //Sends HTTP GET request to retrieve user data
  this.http.post<{token: string} > ("http://localhost:8080/api/v1/auth/authenticate", this.signIn.value)
  .subscribe(resp=>{
    const token = resp.token;
    //Response received, search for user with provided email and password
    // const user=resp.find((details:any)=>{
    //   return details.email === this.signIn.value.email && details.password === this.signIn.value.password
    
    // });

    if(token){
      alert('Login Successful');
     this.token = token;
      this.userEmail = this.signIn.value.email;
      
      localStorage.setItem("token", token);
      this.UserLoggedIn = true;
      localStorage.getItem("token");
      // this.watchlist.clearList();
      // console.log(this.userEmail)
      // this.signIn.reset();
      this.router.navigate(["/home"])
       this.authsev.login(this.userEmail, token);
      // console.log(this.UserLoggedIn);
    }else{
      alert("user not found")
    }
  })
  
}

}
