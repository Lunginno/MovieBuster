import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataApiService } from 'src/app/services/api/data-api.service';
import { FavouriteService } from 'src/app/services/favourite/favourite.service';
import { PpService } from 'src/app/services/pp.service';
import { WatchlistService } from 'src/app/services/watchlist/watchlist.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  addedToWatchlist: boolean | undefined;

  constructor(
    private movieService: DataApiService,
    private route: ActivatedRoute,
    private watchlist :WatchlistService,
    private loginuser: PpService,
    private router:Router,
    private fav_service:FavouriteService
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

  addToFavorites(): void {
    this.fav_service.addToFavorites(this.movie);
    // Implement logic to add the movie to favorites
  }

  addToWatchlist(m: any){  
    if(this.loginuser.getIsLoggedIn()){
      this.watchlist.addToWacthlist(m);
      // m.addedToWatchlist = !m.addedToWatchlist;
      // console.log('Movie added' + this.watchlist.getList());
    }
    else{
      alert("User account not found, directing you to sign in...")
      this.router.navigate(['login']);
    }

    // m.addedToWatchlist = !m.addedToWatchlist;
    // console.log('Movie added' + this.watchlist.getList());
  }

}
