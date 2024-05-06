import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
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
  EmptyList: boolean = false;
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
  ) {
   
  }

  ngOnInit() {
    this.fetchAllMovies();
    this.isLoggedIn = this.auth.getIsLoggedIn();
    // console.log(this.isLoggedIn)
    if (this.isLoggedIn) {
      this.userEmail = this.auth.getLoggedInUserEmail();
      // console.log('User email'+this.userEmail)
    }
    this.movieService.movieCategory$.subscribe(category => {
      this.loadMovies(category);
    });

    this.movieService.searchQuery$.subscribe((query: string) => {
        if (query.trim() !== '') {
          this.getMovies(query);
        }
         
    });
}

fetchAllMovies() {
  forkJoin([
    this.movieService.getPopularr(1),
    this.movieService.getTopRatedMovies(),
    this.movieService.getUpcomingMovies()
  ]
    
    ).subscribe(([popular1, toprated, upcomingMovies])=>{
    this.data = [
      ...popular1.results,
      ...toprated.results,
      ...upcomingMovies.results
    ];
  })
}


loadMovies(category: string) {
  switch (category) {
    case 'All':
      this.fetchAllMovies();
      break;
    case 'Upcoming':
      this.movieService.getUpcomingMovies().subscribe(data => this.data = data.results);
      break;
    case 'Popular':
      this.movieService.getPopularr(1).subscribe(data => this.data = data.results);
      break;
    case 'Top Rated':
      this.movieService.getTopRatedMovies().subscribe(data => this.data = data.results);
      break;
  }
}

  getMovies(searchQuery: string): void {
    this.movieService.searchMovies(searchQuery).subscribe(
      (movies: any) => {
        this.data = movies.results;
        this.EmptyList = this.data.length === 0;
        // console.log(this.EmptyList);
      },
      (error: any) => {
        console.error('An error occurred while fetching movies:', error);
        this.errormessage = 'An error occurred while fetching movies. Please try again later.'; // Set the error message
      }
    );
  }
  
  goToMovieDetails(id: number) {
    this.router.navigate(['/details', id]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
 
}