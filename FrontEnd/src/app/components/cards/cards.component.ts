import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {

  data: any;

  constructor(private dataservice: DataService){}

  ngOnInit(){
    this.dataservice.getData().subscribe(response => {
      this.data = response;
      console.log(this.data);
    });
  }

}
