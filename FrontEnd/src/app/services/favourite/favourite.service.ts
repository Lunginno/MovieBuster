import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private apiUrl = 'http://localhost:8080/api/v1/auth/movies/favourite'
  // private favourites: any[] = [];
  data: any[]=[];
  favouritesMovies: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnit(){
    this.getFavourites().subscribe(favourites => {
      this.favouritesMovies = favourites;
    });
  }

  getFavourites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


addToFavorites(movie: any) {
  if (!this.favouritesMovies.includes(movie)) {
      this.favouritesMovies.push(movie);
      movie.addedToWatchlist = true;
      const userId = 1;
      // Extract necessary details from the movie object
      const { id, title, backdrop_path, genre, vote_average, release_date } = movie;

      // Construct the payload in the desired format
      const payload = {
          id,
          title,
          backdrop_path, // Assuming overview corresponds to description
          genre,
          movie_rating: vote_average, // Assuming vote_average corresponds to movie_rating
          movie_date: release_date, // Assuming release_date corresponds to movie_date
          user: {
            id: userId
        }
      };
      console.log('https://image.tmdb.org/t/p/w370_and_h556_bestv2/'+ backdrop_path)

      if (userId) {
          // Make a POST request to the API with the user ID as a query parameter
          this.http.post(`http://localhost:8080/api/v1/auth/movies/favourite?userId=${userId}`, payload)
              .subscribe(
                  response => {
                      console.log('Movie added successfully:', response);
                  },
                  error => {
                      console.error('Error adding movie:', error);
                  }
              );
      } else {
          console.error('User ID is missing.');
      }
  } else {
      alert('Movie already added');
      movie.addedToWatchlist = true;
  }
}


  removeFromFavorites(movie: any): Observable<any> {
    const index = this.favouritesMovies.findIndex(fav => fav.id === movie.id);
    if (index !== -1) {
      this.favouritesMovies.splice(index, 1);
      return this.http.delete(`${this.apiUrl}/${movie.id}`).pipe(
        catchError(error => {
          console.error('Error removing movie from favorites:', error);
          return of(null);
        })
      );
    } else {
      console.log('Movie not found in favorites');
      return of(null);
    }
  }

  getFavorites(): any[] {
    return this.favouritesMovies;
  }

  isInFavorites(movie: any): boolean {
    return this.favouritesMovies.some(fav => fav.id === movie.id);
  }
}
