import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, pipe, throwError } from 'rxjs';
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
    this.baseUrl = 'https://api.themoviedb.org/3/'; 
    this.baseUrldetails = 'https://api.themoviedb.org/3/movie';
    this.apiKey = '70eccbdfe28fcb50b5b1bc95a3789f1b';
    this.language = 'en-US';
    this.region = 'US';
   
  }
//movies
 public url = '';

  getPopular(): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${this.baseUrl}movie/popular?api_key=${this.apiKey}&page=2}&language=${this.language}&region=${this.region}`);
  }

  searchMovies(searchStr: string): Observable<any> {
    return this.http.get(`${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${searchStr}`)
  }



  getMovie(): Observable<any> {
    // return this.http.get(`${this.baseUrl}?api_key=${this.apiKey}&&page=1`);
    return (this.http.get(`${this.baseUrl}discover/movie?api_key=${this.apiKey}`) );
    // https://api.themoviedb.org/3/discover/movie?api_key=70eccbdfe28fcb50b5b1bc95a3789f1b
  }

  getPopularr(page: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${this.baseUrl}movie/popular?api_key=${this.apiKey}&page=${page}`);
  }

  getMoviedetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrldetails}/${id}?api_key=${this.apiKey}`);
    //https://api.themoviedb.org/3/movie/157336?api_key=70eccbdfe28fcb50b5b1bc95a3789f1b
    // https://api.themoviedb.org/3/discover/moviemovie/157336?api_key=70eccbdfe28fcb50b5b1bc95a3789f1b
  }

  private searchQuerySource = new Subject<string>();
  searchQuery$ = this.searchQuerySource.asObservable();



  setSearchQuery(query: string): void {
    this.searchQuerySource.next(query);
  }


}
