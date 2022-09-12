import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { infoApp } from '../interfaces/interfaces';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private _infoApp = new BehaviorSubject<infoApp>({
    lon: null,
    lat: null
  })
  public infoApp$ = this._infoApp.asObservable()

  // actualizar location con el buscador
  setInfoApp(data: infoApp) {
    this._infoApp.next(data)
  }

  // functions location 
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }

  getLocation() {
    this.getPosition().then(pos => {
      console.log('lat', pos.lat, 'lon', pos.lng)
      this.setInfoApp({
        lon: pos.lat  ,
        lat: pos.lng
    });
    this.ws.getWeather(pos.lng, pos.lat, 'asas')
    this.ws.getFiveDays(0,0,'sas')
  })}

  constructor(
    private ws: WeatherService
  ) { }
}
