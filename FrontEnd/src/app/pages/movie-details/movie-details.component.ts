import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from 'src/app/services/api/data-api.service';
import { WatchlistService } from 'src/app/services/watchlist/watchlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  template: `<button (click)="checkStatus()">{{ movie.clearTheWatchlist ? 'Added' : 'Add to watchlist' }}</button>
  `
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  addedToWatchlist: boolean = false;
  statusTheWatchlist: boolean = false;
  status: boolean = false;

  constructor(
    private movieService: DataApiService,
    private route: ActivatedRoute,
    private watchlist :WatchlistService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = +params['id'];  // Plus ensures the parameter is a number
      this.movieService.getMoviedetails(id).subscribe({
        next: (data) => this.movie = data,
        error: (err) => console.error(err)
      });
    });

  }
  getMovieImageUrl(path: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const size = 'w780';  // You can choose different sizes like 'w300', 'w780', etc.
    return `${baseUrl}${size}${path}`;
  }

  addToList(m: any){  
    this.watchlist.addToList(m);
    m.addedToWatchlist = !m.addedToWatchlist;
    console.log('Movie added' + this.watchlist.getList());
  }

  checkStatus()
  {
    if (this.status === false)
    {
      alert("User account not found, directing you to sign in...")
      this.router.navigate(['login']);
    }
    else
    {
      return this.addToList(this.movie);
    }

  }

  // clearList()
  // {
  //   this.watchlist.clearList();
  //   this.router.navigate(['/login']);
  // }



}
