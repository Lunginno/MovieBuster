import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(private http:HttpClient) { }

  private watchlistArray: any[] = [];
  private addedMovies: any[] = [];

  addToList(movie: any){
    if(!(this.watchlistArray.includes(movie))){
      this.watchlistArray.push(movie);
      movie.addedToWatchlist = true;
  
      // Extract id and name from the movie object
      const movieId = movie.id;
      const movieName = movie.title;
      const moviedescription = movie.description;
      console.log(movieId);
      console.log(movieName);
  
      // Make a POST request to the API with id and name as part of the request body
      this.http.post('http://localhost:8080/api/v1/movies/favourite', { id: movieId, title: movieName, })
        .subscribe(
          response => {
            console.log('Movie added successfully:', response);
          },
          error => {
            console.error('Error adding movie:', error);
          }
        );
    }else{
      alert('Movie already added');
      movie.addedToWatchlist = true;
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
