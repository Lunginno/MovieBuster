import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PpService } from '../pp.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private apiUrl = 'http://localhost:8080/api/v1/auth/movies/favourite';
  favouritesMovies: any[] = [];
  userId: number | null = null;

  constructor(private http: HttpClient, private auth: PpService) {
    this.auth.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userId = this.auth.getUserId();
    });
    this.getFavourites().subscribe(favourites => {
      this.favouritesMovies = favourites;
    });
  }

  getFavourites(): Observable<any[]> {
    const userId = this.userId;
    console.log(userId)
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError((error: HttpClient)=>{
        return throwError(error);
        
      })
    );
    // return this.http.get(`${this.baseUrl}movie/popular?api_key=${this.apiKey}&page=${page}`);
  }

  addToFavorites(movie: any) {
    const userId = this.userId;
    if (!userId) {
      console.error('User ID is missing.');
      return;
    }

    // if (!this.favouritesMovies.includes(movie)) {
      // this.favouritesMovies.push(movie);
      // movie.addedToWatchlist = true;
      const { id, title, backdrop_path, genre, vote_average, release_date } = movie;

      const payload = {
        id,
        title,
        backdrop_path,
        genre,
        movie_rating: vote_average,
        movie_date: release_date,
        user: {
          id: userId
        }
      };

      

      this.http.post(`${this.apiUrl}?userId=${userId}`, payload)
        .subscribe(
          response => {
            console.log('Movie added successfully:', response);
          },
          error => {
            console.error('Error adding movie:', error);
          }
        );
        
    // } else {
    //   alert('Movie already added');
    //   movie.addedToWatchlist = true;
    // }
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
