import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, } from 'rxjs';
import { environment } from 'src/environments/environment';
 


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private _weatherInfo = new BehaviorSubject<any>({})
  public weatherInfo$ = this._weatherInfo.asObservable()

  private _fiveDaysWeather = new BehaviorSubject<any>({})
  public fiveDaysInfo$ = this._fiveDaysWeather.asObservable()

  // no valen para nada
  private _minTotal = new BehaviorSubject<number>(0)
  public minTotal$ = this._minTotal.asObservable()

  private _maxTotal = new BehaviorSubject<number>(40)
  public maxTotal$ = this._maxTotal.asObservable()

  setWeatherInfo(data: any) {
    this._weatherInfo.next(data)
  }

  setFiveDaysInfo(data: any) {
    this._fiveDaysWeather.next(data)
  }

  setMinTotal(data: number) {
    this._minTotal.next(data)
  }

  setMaxTotal(data: number) {
    this._minTotal.next(data)
  }

  constructor(
    private http: HttpClient
  ) { }



  getWeather(lon: number | null, lat: number | null, apiKey: string) {
    if (lon !== null && lat !== null) {
      this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${environment.API_KEY}&units=metric`).subscribe(resp => this.setWeatherInfo(resp))
    }
  }





  getFiveDays(lon: number | null, lat: number | null, apikey: string) {

    this.http.get<any>('https://api.openweathermap.org/data/2.5/forecast?lat=-0,43&lon=39,18&appid=0fb7c2134df34390a984cdd3448c38de&units=metric').pipe(
      map(resp => {
        console.log(resp)
        const arrayFiveDays: any[] = []
        const arrayFiveDaysTemperaturas: number[] = []
        let maxTemp: number | undefined = undefined
        let minTemp: number | undefined = undefined



        resp.list.filter((x: any) => {
          arrayFiveDaysTemperaturas.push(x.main.temp)
        })

        // MAX de todos los dias
        maxTemp = Math.max(...arrayFiveDaysTemperaturas)
        this.setMaxTotal(maxTemp)

        // MIN de todos los dias
        minTemp = Math.min(...arrayFiveDaysTemperaturas)
        this.setMinTotal(minTemp)

        if (minTemp !== undefined && maxTemp !== undefined) {


          resp.list.forEach((e: any) => {
            arrayFiveDays.push({
              'day': `${e.dt_txt.slice(5, 10)}`,
              'hour': `${e.dt_txt.slice(5, 10)} - ${e.dt_txt.slice(11, 16)}`,
              'temp': e.main.feels_like,
              'humidity': e.main.humidity,
              'rain': e.rain?.['3h'] | 0,
              'snow': e.snow?.['3h'] | 0,
              'mode': e.weather[0].description,
              'main': e.weather[0].main,
              'visibility': e.visibility,
              'speedWind': e.wind.speed

            })
          })
        }

        return arrayFiveDays
      })

    ).subscribe(
      resp => { this.setFiveDaysInfo(resp) }
    )

  }


}
