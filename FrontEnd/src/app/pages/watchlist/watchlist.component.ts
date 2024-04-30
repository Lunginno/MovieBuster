import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WatchlistService } from 'src/app/services/watchlist/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent {

  constructor(private watchlistservice:WatchlistService,private router:Router){}
  data: any[]=[];

  ngOnInit(){
    this.data = this.watchlistservice.getList();
    // console.log('watchlist data'  + this.data)
    // this.watchlistservice.removeMovie(this.data);
  }

  removeMovie(data:any){
    this.watchlistservice.removeMovie(data);
  }
  goToMovieDetails(id: number) {
    this.router.navigate(['/details', id]);
  }
    
  


}
