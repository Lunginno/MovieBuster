import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {

  data: any;
  public id: number | undefined;
  movie: any;
  baseUrl: any;
  apiKey: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private movieService: DataApiService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.movieService.getMovie().subscribe((movies: any) => {
      this.data = movies.results;
      console.log('This is my data'+this.data);
      // console.log('Id for movies'this.data.id);
      
    });

    
    // this.movieService.getPopular(1).subscribe((movies: any) => {
    //   this.movie = movies.results;
    //   console.log('This is my data'+this.movie);
    // });
  }

  goToMovieDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

 
  }

  

