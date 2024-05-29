import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WatchlistService } from 'src/app/services/watchlist/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit{

  data: any[] = [];

  constructor(private watchlist: WatchlistService, private router: Router){

  }
    
  ngOnInit(): void {
      this.getWatchlist();
    }

    getWatchlist():void{
      this.watchlist.getWatchlist().subscribe(
        (response: any[]) => {
          this.data = response;
          console.log('Watchlist movie:', this.data);
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching favorite:', error.error.message);
        }
      ); 
    }

  
  
  goToWatchlist(id:number){
    this.router.navigate(['/details',id]);
  }

}
