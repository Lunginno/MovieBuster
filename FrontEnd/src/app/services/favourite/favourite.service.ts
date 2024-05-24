import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private apiUrl = 'http://localhost:8080/api/v1/auth/movies/favourite'
  // private favourites: any[] = [];
  data: any[]=[];
  favouritesMovies: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnit(){
    this.getFavourites().subscribe(favourites => {
      this.favouritesMovies = favourites;
    });
  }

  getFavourites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // addToFavorites(movie: any): Observable<any> {
  //   if (!this.isInFavorites(movie)) {
  //     return this.http.post(this.apiUrl, movie).pipe(
  //       catchError(error => {
  //         console.error('Error adding movie to favorites:', error);
  //         return of(null);
  //       })
  //     );
  //   } else {
  //     console.log('Movie already added to favorites');
  //     return of(null);
  //   }
  // }

//   addToFavorites(movie: any) {
//     if (!this.favouritesMovies.includes(movie)) {
//         this.favouritesMovies.push(movie);
//         movie.addedToWatchlist = true;
//         console.log(this.favouritesMovies);

//         // Extract necessary details from the movie object
//         const { id, title, overview, genre, vote_average, release_date } = movie;

//         // Construct the payload in the desired format
//         const payload = {
//             id,
//             title,
//             overview,
//             genre,
//             vote_average,
//             release_date
//         };
//         console.log(payload);

//         // Get user ID from the query parameter
//         // const userId = new URLSearchParams(window.location.search).get('userId');
//         const userId = 652;
//         // Make a POST request to the API with the user ID as a query parameter
//         this.http.post(`http://localhost:8080/api/v1/auth/movies/favourite?userId=${userId}`, payload)
//             .subscribe(
//                 response => {
//                     console.log('Movie added successfully:', response);
//                 },
//                 error => {
//                     console.error('Error adding movie:', error);
//                 }
//             );
//     } else {
//         alert('Movie already added');
//         movie.addedToWatchlist = true;
//     }
// }

addToFavorites(movie: any) {
  if (!this.favouritesMovies.includes(movie)) {
      this.favouritesMovies.push(movie);
      movie.addedToWatchlist = true;
      const userId = 652;
      // Extract necessary details from the movie object
      const { id, title, overview, genre, vote_average, release_date } = movie;

      // Construct the payload in the desired format
      const payload = {
          id,
          title,
          description: overview, // Assuming overview corresponds to description
          genre,
          movie_rating: vote_average, // Assuming vote_average corresponds to movie_rating
          movie_date: release_date, // Assuming release_date corresponds to movie_date
          user: {
            id: userId
        }
      };

      // Get user ID from the query parameter
      // const userId = new URLSearchParams(window.location.search).get('userId');
      // Make sure userId is not null
      if (userId) {
          // Make a POST request to the API with the user ID as a query parameter
          this.http.post(`http://localhost:8080/api/v1/auth/movies/favourite?userId=${userId}`, payload)
              .subscribe(
                  response => {
                      console.log('Movie added successfully:', response);
                  },
                  error => {
                      console.error('Error adding movie:', error);
                  }
              );
      } else {
          console.error('User ID is missing.');
      }
  } else {
      alert('Movie already added');
      movie.addedToWatchlist = true;
  }
}


  removeFromFavorites(movie: any): Observable<any> {
    const index = this.favouritesMovies.findIndex(fav => fav.id === movie.id);
    if (index !== -1) {
      this.favouritesMovies.splice(index, 1);
      return this.http.delete(`${this.apiUrl}/${movie.id}`).pipe(
        catchError(error => {
          console.error('Error removing movie from favorites:', error);
          return of(null);
        })
      );
    } else {
      console.log('Movie not found in favorites');
      return of(null);
    }
  }

  getFavorites(): any[] {
    return this.favouritesMovies;
  }

  isInFavorites(movie: any): boolean {
    return this.favouritesMovies.some(fav => fav.id === movie.id);
  }
}
