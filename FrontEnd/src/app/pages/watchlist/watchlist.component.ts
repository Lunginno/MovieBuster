import { Component } from '@angular/core';
import { WatchlistService } from 'src/app/services/watchlist/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent {
  constructor(private watchlistservice:WatchlistService){}
  data: any[]=[];

  ngOnInit(){
    this.data = this.watchlistservice.getList();
    console.log('watchlist data'  + this.data)
  }


}
