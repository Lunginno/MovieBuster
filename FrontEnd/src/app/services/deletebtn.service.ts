import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of} from 'rxjs'; // "of" it is to see the immediate changes for that time
import { catchError, map, tap } from 'rxjs/operators'; // "map" transforms observable data into a new observable data. 
//"tap" allows you to make changes in the observable without changing the observable data


@Injectable({
  providedIn: 'root'
})
export class DeletebtnService {

  private url = "https://www.themoviedb.org/";
  
  constructor(private http: HttpClient)
  {

  }

}
