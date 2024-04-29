import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(private router: Router){}

  onClick(){
    this.router.navigate(['/profile']);
  }
  onHome(){
    this.router.navigate(['/home'])
  }
}
