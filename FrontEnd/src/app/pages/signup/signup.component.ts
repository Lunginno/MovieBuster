import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  //signup will bw a formgroup object
  public signUp !: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){}

  ngOnInit():void
  {
    //assigns the form group created by formbuilder.group() to the sigUp
   this.signUp = this.formBuilder.group({
      email: [''],
      password: ['']

    })
  }

  signup()
  {
    this.http.post<any>("http://localhost:3000/signupUsersList/",this.signUp.value).subscribe(resp=>{

      console.log('sign up successful');
      //the navigator method accepts an array of route as an argument
      console.log(this.signup());
      
      // this.router.navigate(["login"])
    },error=>{
        alert("something went wrong");

    })
    //send a request to the server
    
  }
}
