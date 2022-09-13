import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html' 
})

export class SearchComponent implements OnInit {

  @ViewChild('formDinamico') formDinamico!: NgForm

  cities: any;

  selectedCity: any;

  city: string = ''
  constructor(
    private ls: LocationService,
    private ws: WeatherService
  ) { }

  ngOnInit(): void {
  }

  searchCity(){
    if(this.city === ''){
      return this.cities = []
    }
    return this.ls.getCityLocationList(this.city).subscribe(
      resp => { 
       if(this.city !== ''){
        this.cities = [];
        this.cities = resp
        console.log(resp)
        console.log(this.cities)
      }}
      
    )
  }
  
  changeCity(cod: number){
  if(this.city !== ''){
    
    let arrayCities = this.cities
    let lat = arrayCities[cod].lat
    let lon = arrayCities[cod].lon

    
    
   
    this.ws.getWeather(lon, lat)
    this.ws.getFiveDays(lon, lat)
    this.ls.setInfoMap([lon, lat])
    
    
    this.city = ""
    this.cities = []
  }
  }


}
