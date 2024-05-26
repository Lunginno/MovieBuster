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

  getFavourites(): void {
    this.favourite.getFavourites().subscribe(
      (response: any[]) => {
        this.data = response;
        console.log('Favorite movies:', this.data);
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
