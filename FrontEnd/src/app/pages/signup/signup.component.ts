import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PpService } from 'src/app/services/pp.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public signUp!: FormGroup;
  public userLoggedIn: boolean = false;
  public userEmail: string = '';
  public emailExistsError: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authsev: PpService
  ) {}

  ngOnInit(): void {
    this.signUp = this.formbuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      cpassword: new FormControl('', Validators.required)
    }, { validator: this.checkPasswords });
  }

  checkPasswords(formgroup: FormGroup): any {
    const password = formgroup.get('password')?.value;
    const cpassword = formgroup.get('cpassword')?.value;

    return password === cpassword ? null : { passwordMismatch: true };
  }

  signup() {
    if (this.signUp.invalid) return;

    const userEmail = this.signUp.get('email')?.value;
    this.http.get<any>(`http://localhost:8080/api/v1/auth/check-email?email=${userEmail}`).subscribe(
      (response) => {
        if (response.exists) {
          alert('user exists')
          this.emailExistsError = true;
          
        } else {
          this.http.post<any>("http://localhost:8080/api/v1/auth/register", this.signUp.value).subscribe(
            (resp) => {
              this.userEmail = this.signUp.value.email;
              this.userLoggedIn = true;
              // this.authsev.login(this.userEmail);
              this.signUp.reset();
              this.router.navigate(["login"]);
            },
            (error) => {
              alert("Something went wrong");
            }
          );
        }
      },
      (error) => {
        alert("Something went wrong");
      }
    );
  }
}
