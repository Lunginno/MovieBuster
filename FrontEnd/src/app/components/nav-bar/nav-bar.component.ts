import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataApiService } from 'src/app/services/api/data-api.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(private router: Router, private MoviaApiService: DataApiService){}

  searchQuery: string = '';
  public data: any[] = [];
  myGroup: any;


  ngOnit(){
  }

  searchMovies(): void {
    // console.log(this.searchQuery+ ' search');
    this.MoviaApiService.setSearchQuery(this.searchQuery); // Use the service to set the search query
  }



  onClick(){
    this.router.navigate(['/profile']);
  }
  onHome(){
    this.router.navigate(['/home'])
  }
}
