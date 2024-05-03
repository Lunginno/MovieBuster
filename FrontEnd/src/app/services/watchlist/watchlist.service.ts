import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor() { }

  private watchlistArray: any[] = [];

  addToList(movie: any){
    if(!(this.watchlistArray.includes(movie))){
      this.watchlistArray.push(movie);
    }else{
      alert('Movie already added');
    }
   
  }

  getList(){
    return this.watchlistArray;
  }

  removeMovie(movie: any){
    this.watchlistArray.splice(this.watchlistArray.indexOf(movie), 1);
  }

  clearList()
  {
    return this.watchlistArray  = [];
  }



}
