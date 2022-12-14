import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl'
// import 'mapbox-gl/dist/mapbox-gl.css'
import { LocationService } from '../../services/location.service';
import { environment } from '../../../environments/environment.prod';
import { LngLatLike } from 'mapbox-gl';


@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html'
})
export class MapBoxComponent implements AfterViewInit {

  location: LngLatLike = [undefined, undefined]

  mostrarMapa: boolean = false
  
  @ViewChild('mapDiv') mapDivElement!: ElementRef

  constructor(
    private ls: LocationService
  ) {
    
    
    { setTimeout(()=> {
      this.mostrarMapa = true
    }, 1000)
     
  }
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
     this.ls.infoMap$.subscribe(resp => {
      console.log('por aqui')
      this.mostrarMapa = false,
      this.location = resp
    console.log(this.location)

    
    {setTimeout(()=> {
     
      (mapboxgl as typeof mapboxgl).accessToken = environment.MAPBOX_KEY

      this.mostrarMapa = true

      const map = new mapboxgl.Map({
        container: 'map-mapbox', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: this.location, // starting position [lng, lat]
        zoom: 10, // starting zoom
        projection: {name: "globe"}
       
      });
  
      const marker = new mapboxgl.Marker()
      .setLngLat(this.location)
      .addTo(map);
  
     this.mostrarMapa = true
    }, 500)
  }
    }
      )
      }
  


  
  

}
