import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { DataApiService } from 'src/app/services/api/data-api.service';
import { PpService } from 'src/app/services/pp.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {

  data: any[] = [];
  errormessage: string='';
;
  public id: number | undefined;
  movie: any;
  baseUrl: any;
  apiKey: any;
  isLoggedIn: boolean = false;
  userEmail: string = '';
  searchQuery: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private movieService: DataApiService,
    private http: HttpClient,
    private auth:PpService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.getIsLoggedIn();
    console.log(this.isLoggedIn)
    if (this.isLoggedIn) {
      this.userEmail = this.auth.getLoggedInUserEmail();
      console.log('User email'+this.userEmail)
    }
    
    // this.movieService.getPopular().subscribe((movies: any) => {
    //   this.data = movies.results;
    //   console.log('This is my data'+this.data);
    //   // console.log('Id for movies'this.data.id);
      
    // });
    // this.movieService.getMovie().subscribe((movies: any) => {
    //   this.data = movies.results;
    //   // console.log('Id for movies'this.data.id);
      
    // });

    // combines multiple observables into a single observable
  
    forkJoin([
      // this.movieService.getPopular(),
      // this.movieService.getMovie(),
      this.movieService.getPopularr(1),
      this.movieService.getPopularr(2),
      this.movieService.getPopularr(3),
      this.movieService.getPopularr(4),
      this.movieService.getPopularr(5),
      this.movieService.getPopularr(6),
    ]).subscribe(([popularMovie1, popularMovie2, popularMovie3, popularMovie4, popularMovie5, popularMovie6]) => {
    //   this.data = [...popularMovies.results,...allMovies.results]; is an array 
      this.data = [
        ...popularMovie1.results,
        ...popularMovie2.results,
        ...popularMovie3.results,
        ...popularMovie4.results,
        ...popularMovie5.results,
        ...popularMovie6.results
      
      ];
      // console.log('Merged data:', this.data);
    });

    this.movieService.searchQuery$.subscribe((query: string) => {
      // console.log('Cards : Received search query:', query); // Add this line
        if (query.trim() !== '') {
          this.getMovies(query);
        } else {
          forkJoin([
            // this.movieService.getPopular(),
            // this.movieService.getMovie(),
            this.movieService.getPopularr(1),
            this.movieService.getPopularr(2),
            this.movieService.getPopularr(3),
            this.movieService.getPopularr(4),
            this.movieService.getPopularr(5),
            this.movieService.getPopularr(6),
          ]).subscribe(([popularMovie1, popularMovie2, popularMovie3, popularMovie4, popularMovie5, popularMovie6]) => {
          //   this.data = [...popularMovies.results,...allMovies.results]; is an array 
            this.data = [
              ...popularMovie1.results,
              ...popularMovie2.results,
              ...popularMovie3.results,
              ...popularMovie4.results,
              ...popularMovie5.results,
              ...popularMovie6.results
            
            ];
        });
      }
    });
}
  getMovies(searchQuery: string): void {
    // this.movieService.searchMovies(searchQuery).subscribe((movies: any) => {
    //   this.data = movies.results;
    //   // console.log(this.data);
    // });
    this.movieService.searchMovies(searchQuery).subscribe(
      (movies: any) => {
        this.errormessage = ''; // Clear any previous error message
        this.data = movies.results;
      },
      (error: any) => {
        console.error('An error occurred while fetching movies:', error);
        this.errormessage = 'An error occurred while fetching movies. Please try again later.'; // Set the error message
      }
    );
  }
  
  goToMovieDetails(id: number) {
    this.router.navigate(['/details', id]);
  }
 
}