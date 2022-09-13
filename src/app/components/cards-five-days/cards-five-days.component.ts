import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

interface Day {
  day: string;
  hour: string;
  humidity: number;
  rain: number;
  snow: number;
  temp: number

}

@Component({
  selector: 'app-cards-five-days',
  templateUrl: './cards-five-days.component.html' 
})
export class CardsFiveDaysComponent implements OnInit {


  products: Day[] = [];

	

	constructor(private ws: WeatherService ) {
   
    this.ws.fiveDaysInfo$.subscribe( resp => {
      this.products = []
      if( resp[0] !== undefined ){
      this.products.push(resp[0], resp[8], resp[16], resp[24], resp[32])
     }} )

    
     
	}

	ngOnInit() {
    }

}
