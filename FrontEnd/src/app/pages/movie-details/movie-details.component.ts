import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;

  constructor(
    private movieService: DataApiService,
    private route: ActivatedRoute
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
    const size = 'w500';  // You can choose different sizes like 'w300', 'w780', etc.
    return `${baseUrl}${size}${path}`;
  }
}
