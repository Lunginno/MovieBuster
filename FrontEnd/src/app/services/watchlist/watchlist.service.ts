import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PpService } from '../pp.service';
import { Observable, catchError, throwError } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WatchlistService {

  private apiUrl = "http://localhost:8080/api/v1/auth/wacthlist";
  watchlistMovies: any[] = [];
  userId: number | null = null;

  constructor (private http: HttpClient, private auth: PpService){
    this.auth.getAuthStatusListener().subscribe (isAuthenticated =>{
      this.userId = this.auth.getUserId();
    });

    this.getWatchlist().subscribe(watchlist => {
      this.watchlistMovies = watchlist;
      // console.log(watchlist)
    });
  }

  getWatchlist(): Observable<any[]> {
    const userId = this.userId;
    // console.log(userId)

    if(!userId){
      console.error('User Id is missing');
      return of([]);
    }

    // console.log(userId);
    
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError((error: HttpClient) => {
        return throwError(error);
      })
    );
  }

  addToWacthlist(movie: any){
    const userId = this.userId;

    if(!userId){
      console.error('User ID is missing.');

      return;
    }
    const {id ,title, backdrop_path, release_date, vote_average } = movie;

  const payload = {
    id,
    movie_title:title,
    image: backdrop_path,
    release_date: release_date,
    movie_rating: vote_average,
    user: {
      id: userId
    }
  };

  this.http.post(`${this.apiUrl}?userId=${userId}`, payload)
  .subscribe(
    response => {
      // console.log('Movie added Successfully:', response);
    },
    
    error => {
      // console.error('Error adding movie', error);
    }
  );
  }

  removeFromWatchlist(movie : any): Observable<any>{
    const index = this.watchlistMovies.findIndex(watch => watch.id === movie.id);
    if (index !== -1){
      this.watchlistMovies.splice(index, 1);
      return this.http.delete(`${this.apiUrl}/${movie.id}`).pipe(
        catchError(error => {
          console.error('Error removing movie from watchlist:', error);
          return of(null);
        })
      );
  } else {
    console.log('Movie not found in Watchlist');
    return of(null);
    }
  }

  getWatchlists(): any[]{
    return this.watchlistMovies;
  }

  isInWatchlist(movie: any): boolean{
    return this.watchlistMovies.some(watch => watch.id === movie.id );
  }

}
