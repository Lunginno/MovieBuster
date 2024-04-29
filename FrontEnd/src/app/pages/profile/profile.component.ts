import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  signin: any;

  constructor(private http: HttpClient,private signinserv :AuthService) {}

  ngOnInit() {
    this.signinserv.signIn().subscribe((data: any) => {
      this.signin = data;
      // console.log(this.signin[0].email);
    });
  }
}
