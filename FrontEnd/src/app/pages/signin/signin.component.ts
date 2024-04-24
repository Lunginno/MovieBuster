import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
public signIn !: FormGroup

constructor(private http: HttpClient, private router:Router, private formBuilder: FormBuilder){}

ngOnInit():void{
  this.signIn=this.formBuilder.group({
    email:[""],
    password:[""]
  })
}

signInForm()
{
  this.http.get<any>("http://localhost:3000/signupUsersList").subscribe(resp=>{
    const user=resp.find((value:any)=>{
      
    })
  })
}
}

