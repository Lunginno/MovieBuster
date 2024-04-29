import { group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public signUp !: FormGroup

  constructor( private formbuilder: FormBuilder,private http: HttpClient, private router: Router){}

  //its void beause it doesnt retun anything
  ngOnInit():void
  {
   //Initialize the signIn form group with email, password and confirm password form controls
    this.signUp=this.formbuilder.group({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      cpassword: new FormControl('',Validators.required)

      //in the formgroup custom validator called checkpassword
    },{validator:this.checkPasswords });
  }
//takes a FormGroup as an argument, which represents the entire form group to be validated
  checkPasswords(formgroup:FormGroup):any{
    
    const password =formgroup.get('password')?.value;
    const cpassword =formgroup.get('cpassword')?.value;

    if (password === cpassword) {
      return null; // Passwords match
  } else {
      return { passwordMismatch: true }; // Passwords don't match
  }
}
  

  signup()
  {
    //we posting the value of the signup form to the json file
    this.http.post<any>("http://localhost:3000/signupUsersList/",this.signUp.value).subscribe(resp=>{
//once the data is posted it respond with sign up successful
      console.log('sign up successful');
      //the navigator method accepts an array of route as an argument
      this.signUp.reset()
      this.router.navigate(["login"])
    },error=>{
        alert("something went wrong");

    })
  }
    
  }



