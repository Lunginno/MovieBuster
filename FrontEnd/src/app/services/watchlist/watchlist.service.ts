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

  removeMovie(movie: any){
    this.watchlistArray.splice(this.watchlistArray.indexOf(movie), 1);
  }


}
