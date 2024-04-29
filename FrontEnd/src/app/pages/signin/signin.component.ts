import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  //we use !: to tell the compiler that the formgroup is not null or undefined
public signIn !: FormGroup

//formbuilder id used to create form groups and controls.
constructor(private http: HttpClient, private router:Router, private formBuilder: FormBuilder){}

ngOnInit():void{
  //Initialize the signIn form group with email and password form controls
  this.signIn=this.formBuilder.group({
    email:["",Validators.required],
    password:["",Validators.required]
  })
  
}

// it is triggered when a user clickx the submit login form
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
      //the navigator method accepts an array of route as an argument
      this.router.navigate(["register"])
    }else{
      alert("user not found")
    }
  })
  
}

}

