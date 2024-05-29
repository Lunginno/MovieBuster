import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavouriteService } from 'src/app/services/favourite/favourite.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  data: any[] = [];

  constructor(private favourite: FavouriteService, private router: Router) { }

  ngOnInit(): void {
    this.getFavourites();
  }

  removeMovie(id: number, event: Event): void {
    event.stopPropagation();
    this.favourite.removeFromFavorites(id).subscribe(
      (response: any) => {
        // console.log('Movie removed successfully:', response);
        this.getFavourites();
      },
      (error: HttpErrorResponse) => {
        // console.error('Error removing movie:', error.error.message);
      }
    );
  }

  getFavourites(): void {
    this.favourite.getFavourites().subscribe(
      (response: any[]) => {
        this.data = response;
        console.log('Favorite movies: html', this.data);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching favorite movies:', error.error.message);
      }
    );
  }

  goToMovieDetails(id: number) {
    this.router.navigate(['/details', id]);
  }
}
