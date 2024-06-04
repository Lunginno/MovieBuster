import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataApiService } from 'src/app/services/api/data-api.service';
import { PpService } from 'src/app/services/pp.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(private router: Router, private MoviaApiService: DataApiService, private login:PpService){}

  searchQuery: string = '';
  currentselected: string = 'All';
  public data: any[] = [];
  myGroup: any;
  @Input() showsearch: boolean = true;
  @Input() showmovie: boolean = true;

  ngOnit(){
  }
  setCategory(category: string){
    this.MoviaApiService.setMovieCategory(category);
    this.currentselected = category;
  }

  searchMovies(): void {
    // console.log(this.searchQuery+ ' search');
    this.MoviaApiService.setSearchQuery(this.searchQuery); // Use the service to set the search query
  }



  ngOnInit(): void {
  }

  onClick(){
    if(this.login.getIsLoggedIn()){
      this.router.navigate(['/profile']);//takes user to their profile
    }
    else{
      this.router.navigate(['/login']);
    }
   
  }
  onHome(){
    this.router.navigate(['/home'])//takes user back to home page
  }
}
