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
//formgroup define how all the different parts of your form should be organized and connected
  public signUp !: FormGroup
  public userLoggedIn: boolean = false;
  public userEmail: string = '';


  constructor( private formbuilder: FormBuilder,private http: HttpClient, private router: Router,private authsev:PpService){}

  //its void beause it doesnt retun anything
  //it initializes tasks within a componentskk
  ngOnInit():void
  {
   //Initialize the signIn form group with email, password and confirm password form controls
   //A form group is a collection of form controls
    this.signUp=this.formbuilder.group({
      //form control lets you input or output data in a specific field of your form.
      email: new FormControl('',Validators.required,),
      password: new FormControl('',Validators.compose([ 
        Validators.required,
        Validators.maxLength(8), 
        //Validators.minLength(6),
        Validators.pattern ('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^/&\\\\]).{6,}$'),
      ]) ),
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
    //check if the signup form is invalid
    if(this.signUp.invalid)return;
    //getting the email value from the form
    const userEmail=this.signUp.get('email')?.value;
    //email as a query parameter(is a way to pass data between web pages)
    this.http.get<any>(`http://localhost:3000/signupUsersList/?email=${userEmail}`).subscribe(existingUser => {
    //checks if the response from the server contains any existing user data. 
    if (existingUser.length > 0) {
        // Email already exists, inform the user and prevent signup
        alert('Email already registered.');
      } else {

    
    //we posting the value of the signup form to the json file
    this.http.post<any>("http://localhost:3000/signupUsersList/",this.signUp.value).subscribe(resp=>{
//  once the data is posted it respond with sign up successful
      // console.log('sign up successful');
      //the navigator method accepts an array of route as an argument
      this.userEmail = this.signUp.value.email;
      this.userLoggedIn = true;
      this.authsev.login(this.userEmail);
      // console.log(this.userEmail)
      this.signUp.reset();
      this.signUp.reset()
      this.router.navigate(["login"])
      
    },error=>{
        alert("something went wrong");

    });
    }})
  
  }


}
