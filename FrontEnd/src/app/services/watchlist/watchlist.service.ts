import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PpService } from '../pp.service';
import { Observable, catchError, throwError } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// export class WatchlistService {

  // private apiUrl = "http://localhost:8080/api/v1/auth/watchlist";
  // watchlistMovies: any[] = [];
  // userId: number | null = null;

  // constructor (private http: HttpClient, private auth: PpService){
  //   this.auth.getAuthStatusListener().subscribe (isAuthenticated =>{
  //     this.userId = this.auth.getUserId();
  //   });

  //   this.getWatchlist().subscribe(watchlist => {
  //     this.watchlistMovies = watchlist;
  //     // console.log(watchlist)
  //   });
  // }

  // getWatchlist(): Observable<any[]> {
  //   const userId = this.userId;
  //   // console.log(userId)

  //   return this.http.get<any[]>(`${this.apiUrl}/users/${userId}`).pipe(
  //     catchError ((error: HttpClient) => {
  //       return throwError (error);
  //     }));
  //   }

  // addToWacthlist(movie: any){
  //   const userId = this.userId;

  //   if(!userId){
  //     console.error('User ID is missing.');

  //     return;
  //   }
  //   const {id ,title, backdrop_path, release_date, vote_average } = movie;

  // const payload = {
  //   id,
  //   movie_title:title,
  //   image: backdrop_path,
  //   release_date: release_date,
  //   movie_rating: vote_average,
  //   user: {
  //     id: userId
  //   }
  // };

  // this.http.post(`${this.apiUrl}?userId=${userId}`, payload)
  // .subscribe(
  //   response => {
  //     alert('movie added');
  //     // console.log('Movie added Successfully:', response);
  //   },
    
  //   error => {
  //     alert("Movie already added")
  //     // console.error('Error adding movie', error);
  //   }
  // );
  // }

  // removeFromWatchlist(movie : any): Observable<any>{
  //   const index = this.watchlistMovies.findIndex(watch => watch.id === movie.id);
  //   if (index !== -1){
  //     this.watchlistMovies.splice(index, 1);
  //     return this.http.delete(`${this.apiUrl}/${movie.id}`).pipe(
  //       catchError(error => {
  //         console.error('Error removing movie from watchlist:', error);
  //         return of(null);
  //       })
  //     );
  // } else {
  //   console.log('Movie not found in Watchlist');
  //   return of(null);
  //   }
  // }

  // getWatchlists(): any[]{
  //   return this.watchlistMovies;
  // }

  // isInWatchlist(movie: any): boolean{
  //   return this.watchlistMovies.some(watch => watch.id === movie.id );
  // }

// }

export class WatchlistService{

  private apiUrl = 'http://localhost:8080/api/v1/auth/movies/watchlist';
  watchlistMovies: any[] = [];
  userId: number | null = null;

  constructor (private http: HttpClient, private auth: PpService){
    this.auth.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userId = this.auth.getUserId();
    });
    this.getWatchlist().subscribe(watchlist => {
      this.watchlistMovies = watchlist;
    });
  }

  getWatchlist(): Observable<any[]> {
    const userId = this.userId;

    return this.http.get<any[]> (`${this.apiUrl}/user/${userId}`).pipe(
      catchError((error: HttpClient) => {
        return throwError(error);
      })
    );
  }

  addToWatchlist(movie: any){
    const userId = this.userId;

    if(!userId){
      console.error('User Id is missing.');
      return;
    }

    const {id , title, backdrop_path, genre,  vote_average, release_date} = movie;

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
        alert('movie has been added');
      },
      error => {
        alert('Movie already added')
      }
    );
  }

  removeFromWatchlist(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/v1/auth/movies/watchlist/${id}`)
    .pipe(
      catchError((error: HttpClient) => {
        return throwError(error);
      })
    );
  }

  getWatchlists(): any[] {
    return this.watchlistMovies;
  }

  isInWatchlist(movie: any): boolean{
    return this.watchlistMovies.some(watch => watch.id === movie.id);
  }





}
