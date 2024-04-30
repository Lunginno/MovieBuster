import { group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PpService } from 'src/app/services/pp.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  //signup will be a formgroup object
  public signUp !: FormGroup
  public userLoggedIn: boolean = false;
  public userEmail: string = '';


  constructor( private formbuilder: FormBuilder,private http: HttpClient, private router: Router,private authsev:PpService){}

  ngOnInit():void
  {
  
    this.signUp=this.formbuilder.group({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      cpassword: new FormControl('',Validators.required)
    },{validator:this.checkPasswords });
  }
  checkPasswords(formgroup:FormGroup):any{
    
    const password =formgroup.get('password')?.value;
    const cpassword =formgroup.get('cpassword')?.value;
    //return password === cpassword?null:{mismatch:true}
    if (password === cpassword) {
      return null; // Passwords match
  } else {
      return { passwordMismatch: true }; // Passwords don't match
  }
}
  

  signup()
  {
    this.http.post<any>("http://localhost:3000/signupUsersList/",this.signUp.value).subscribe(resp=>{

      // console.log('sign up successful');
      //the navigator method accepts an array of route as an argument
      this.userEmail = this.signUp.value.email;
      this.userLoggedIn = true;
      this.authsev.login(this.userEmail);
      console.log(this.userEmail)
      this.signUp.reset();
      this.signUp.reset()
      this.router.navigate(["home"])
    },error=>{
        alert("something went wrong");

    })
  }
    
  }



