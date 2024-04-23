import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  data: any;

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
    this.dataservice.getData().subscribe(response => {
      this.data = response;
      console.log(this.data);
    });
  
  }
  


}

