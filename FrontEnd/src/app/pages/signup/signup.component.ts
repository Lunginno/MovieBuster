import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  //signup will be a formgroup object
  public signUp !: FormGroup
  constructor( private formbuilder: FormBuilder,private http: HttpClient, private router: Router){}

  ngOnInit():void
  {
  
    this.signUp=this.formbuilder.group({
      email: new FormControl(''),
      password: new FormControl(''),

    })
  
  }

  signup()
  {
    this.http.post<any>("http://localhost:3000/signupUsersList/",this.signUp.value).subscribe(resp=>{

      console.log('sign up successful');
      //the navigator method accepts an array of route as an argument
      this.signUp.reset()
      this.router.navigate(["login"])
    },error=>{
        alert("something went wrong");

    })
    
  }
}
