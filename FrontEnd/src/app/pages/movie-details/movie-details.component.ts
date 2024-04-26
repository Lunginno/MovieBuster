import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  movie: any;

  constructor(private movieService: DataApiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.movieService.getMovieDetails(id).subscribe((data: any) => {
        this.movie = data;
      });
    });
  
  }
  


}

