import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {

  data: any;

  constructor(private dataservice: DataService,private router :Router){}

  ngOnInit(){
    this.dataservice.getData().subscribe(response => {
      this.data = response;
      console.log(this.data);
    });
  }

  buttonClick(){
    this.router.navigate(['/movie-details']);
  }

}
