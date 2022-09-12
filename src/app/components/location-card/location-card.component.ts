import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';
import { infoApp } from '../../interfaces/interfaces';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html'
})
export class LocationCardComponent implements OnInit {


  fullDate = new Date()

  today: any = {
    day: `${this.fullDate.toDateString().slice(4, 11)}`,
    hour: `${this.fullDate.getHours()}`,
    minute: `${this.fullDate.getMinutes()}`
  }
  
  

  location: infoApp = {
    lon: null,
    lat: null
  }
  nameCity: string = '';


  tempToday: any = {}


  constructor(
    private ls: LocationService,
    private ws: WeatherService
  ) {
    console.log('constructor')

  }





  ngOnInit(): void {
    this.ls.getLocation()

    this.ws.weatherInfo$.subscribe(
      resp => {
        if (resp.main.temp !== undefined) {

          this.tempToday = {
            deg: resp.wind.deg,
            speed: resp.wind.speed,
            mode: resp.weather[0].description,
            humidity: resp.main.humidity,
            temp: resp.main.temp,
            max: resp.main.temp_max,
            min: resp.main.temp_min,
            visibility: resp.visibility,
            pressure: resp.main.pressure
          }

          this.nameCity = `${resp.name}, ${resp.sys.country}`
 
        }


      }
    ) 

  }

}
