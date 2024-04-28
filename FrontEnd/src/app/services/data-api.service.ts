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
  baseUrldetails: string ;

    constructor( private http: HttpClient) { 
    this.baseUrl = 'https://api.themoviedb.org/3/discover/movie';
    this.baseUrldetails = 'https://api.themoviedb.org/3/movie';
    this.apiKey = '70eccbdfe28fcb50b5b1bc95a3789f1b';
    this.language = 'en-US';
    this.region = 'US';
   
  }
//movies
  getMovie(): Observable<any> {
    return this.http.get(`${this.baseUrl}?api_key=${this.apiKey}&&page=1`);
    // https://api.themoviedb.org/3/discover/movie?api_key=70eccbdfe28fcb50b5b1bc95a3789f1b
  }

  // getPopular(page: number): Observable<any> {
  //   // tslint:disable-next-line: max-line-length
  //   return this.http.get(`${this.baseUrl}movie/popular?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`);
  // }

  getMoviedetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrldetails}/${id}?api_key=${this.apiKey}`);
    //https://api.themoviedb.org/3/movie/157336?api_key=70eccbdfe28fcb50b5b1bc95a3789f1b
    // https://api.themoviedb.org/3/discover/moviemovie/157336?api_key=70eccbdfe28fcb50b5b1bc95a3789f1b
  }


  


}
