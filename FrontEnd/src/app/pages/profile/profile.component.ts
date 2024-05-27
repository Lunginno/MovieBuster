import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PpService } from 'src/app/services/pp.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLoggedIn: boolean = false;
  userEmail: string = '';

  constructor(private http: HttpClient,private pp:PpService, private router:Router) {}

  ngOnInit() {
    this.isLoggedIn = this.pp.getIsLoggedIn();
    // console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      this.userEmail = this.pp.getLoggedInUserEmail();
    }
  
  }

  navigateToFavorites(): void {
    this.router.navigate(['/favourite']);
  }
  logout(): void {
    this.pp.logout();
    this.isLoggedIn = false;
    this.userEmail = '';
    
  }
}
