import { Injectable } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';
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

  private _infoMap = new BehaviorSubject<LngLatLike>([0,0])
  public infoMap$ = this._infoMap.asObservable()

  // actualizar location con el buscador
  setInfoApp(data: infoApp) {
    this._infoApp.next(data)
  }

  setInfoMap(data: LngLatLike){
    this._infoMap.next(data)
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
      
      this.setInfoApp({
        lon: pos.lat,
        lat: pos.lng
      });
      this.ws.getWeather(pos.lng, pos.lat )
      this.ws.getFiveDays(pos.lng, pos.lat )
      this.setInfoMap([pos.lng, pos.lat])
    })
  }

  getLocationMap(lng: number, lat: number) {
     this.setInfoMap([lng, lat])
    
  }


  constructor(
    private ws: WeatherService
  ) { }
}
