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

    removeMovie(id: number, event: Event): void {
      event.stopPropagation();
      this.watchlist.removeFromWatchlist(id).subscribe(
        (response: any) => {
          // console.log('Movie removed successfully:', response);
          this.getWatchlist();
        },
        (error: HttpErrorResponse) => {
          // console.error('Error removing movie:', error.error.message);
        }
      );
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
