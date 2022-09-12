import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { LocationService } from '../../services/location.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { distinct, map, tap } from 'rxjs';

@Component({
  selector: 'app-table-five-days',
  templateUrl: './table-five-days.component.html'
})
export class TableFiveDaysComponent implements OnInit {

  minTempTable: number = 0
  maxTempTable: number = 50

  tempOrRain: boolean = true;


  constructor(
    private ws: WeatherService,
    private ls: LocationService
  ) { }

  ngOnInit(): void {
    this.ws.fiveDaysInfo$.subscribe(resp => {
      if (resp.length !== undefined){
        resp.map((element: any) => {
          
          this.lineChartData.labels?.push(element.hour)
          this.lineChartData.datasets[0].data.push(element.temp);
          
        })   
        }


    }
    
    )

    this.ws.fiveDaysInfo$.subscribe( resp => {
      const newArray = [];
      newArray.push(resp[0], resp[8], resp[16], resp[24], resp[32])

      newArray.map((e:any) => {
        this.barChartData.labels?.push(e.day)
        this.barChartData.datasets[0].data?.push(e.rain)
        this.barChartData.datasets[1].data?.push(e.snow)
      })
     } )

    this.ws.fiveDaysInfo$.subscribe( console.log)
  }

  changeGrafic(data: boolean){
    this.tempOrRain = data
  }


  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'ºC',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      }
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 1
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':{
        position: 'left',
        min: 0,
        max: 40
        
      
      }
    },

    plugins: {
      legend: { display: true },

    }
  };

  public lineChartType: ChartType = 'line';

  
  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    return
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    return
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max: 100
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [  ],
    datasets: [
      { data: [ ], label: 'Rain' },
      { data: [ ], label: 'Snow' }
    ]
  };
 
}
