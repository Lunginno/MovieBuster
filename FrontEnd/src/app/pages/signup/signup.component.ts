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
  public signUp !: FormGroup;
  public userLoggedIn: boolean = false;
  public userEmail: string = '';

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router, private authsev: PpService) {}

  ngOnInit(): void {
    this.signUp = this.formbuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([ 
        Validators.required,
        Validators.maxLength(20), 
        Validators.pattern ('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^/&\\\\]).{6,}$'),
      ])),
      cpassword: new FormControl('', Validators.required)
    }, { validator: this.checkPasswords });
  }

  checkPasswords(formgroup: FormGroup): any {
    const password = formgroup.get('password')?.value;
    const cpassword = formgroup.get('cpassword')?.value;

    if (password === cpassword) {
      return null; // Passwords match
    } else {
      return { passwordMismatch: true }; // Passwords don't match
    }
  }
  newUsers = 0;
  signup() {
    if (this.signUp.invalid) return;

    const userEmail = this.signUp.get('email')?.value;

    // Check if the user already exists
    // this.http.get<any>(`http://localhost:8080/api/v1/auth/register/?email=${userEmail}`).subscribe(existingUser => {
    //   if (existingUser.length > 0) {
    //     alert('Email already registered.');
    //   } else {
        // If user doesn't exist, proceed with signup
        let newUser = this.signUp.value;
        newUser['id'] = this.newUsers+1;


        this.http.post<any>("http://localhost:8080/api/v1/auth/register", newUser).subscribe(resp => {
          console.log(this.userEmail);
          
          this.userEmail = this.signUp.value.email;
          this.userLoggedIn = true;
          // this.authsev.login(this.userEmail);
          this.signUp.reset();
          this.router.navigate(["home"]);
        }, error => {
          alert("Something went wrong");
        });
      }
  //   });
  // }

  onEmailInput():void{
    const emailControl = this.signUp.get('email');
    const lowercaseEmail = emailControl?.value.toLowerCase();
    emailControl?.setValue(lowercaseEmail,{emitEvent:false})
  }
}