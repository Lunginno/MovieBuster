import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  baseUrl: string | undefined;
  apiKey: string | undefined;
  language: string | undefined;
  region: string | undefined;

    constructor( private http: HttpClient) { 
    this.baseUrl = 'https://api.themoviedb.org/3/discover/movie';
    this.apiKey = '70eccbdfe28fcb50b5b1bc95a3789f1b';
    this.language = 'en-US';
    this.region = 'US';
   
  }

  getMovie(): Observable<any> {
    return this.http.get(`${this.baseUrl}?api_key=${this.apiKey}&&page=1`);
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${movieId}?api_key=${this.apiKey}`).pipe(
      catchError(error => {
        console.error('Error fetching movie details:', error);
        throw error;
      })
    );
  }

  


}
