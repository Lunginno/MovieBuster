import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor() { }

  private watchlistArray: any[] = [];

  addToList(movie: any){
    this.watchlistArray.push(movie);
  }

  getList(){
    return this.watchlistArray;
  }


}
