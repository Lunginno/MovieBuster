import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { every } from 'rxjs';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent {
data: any;

  constructor(private http: HttpClient)
  {

  }

}
