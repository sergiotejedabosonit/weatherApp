import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { LocationService } from '../../services/location.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { distinct, map, tap } from 'rxjs';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-table-five-days',
  templateUrl: './table-five-days.component.html'
})
export class TableFiveDaysComponent implements OnInit {

  minTempTable: number = 0
  maxTempTable: number = 50

  tempOrRain: boolean = true;
  mostrarTabla1: boolean = true

  constructor(
    private ws: WeatherService,
    private ls: LocationService
  ) { }

  ngOnInit(): void {
    this.ws.fiveDaysInfo$.subscribe(resp => {
      console.log('cambio aqui')
     
      if (resp.length !== undefined) {
        this.mostrarTabla1 = false
       this.lineChartData.labels = []
      this.lineChartData.datasets[0].data = []


        resp.map((element: any) => {


          this.lineChartData.labels?.push(element.hour)
          this.lineChartData.datasets[0].data.push(element.temp);

        })

        setTimeout(()=>{
          this.mostrarTabla1 = true
        },500)
      }


    }

    )

    this.ws.weatherInfo$.subscribe(resp => {

      if (resp.rain?.['1h'] !== undefined) {
        this.barChartData.datasets[0].data = []
        this.barChartData.datasets[0].data?.push(resp.rain?.['1h'] )
      }
      if (resp.snow?.['1h'] !== undefined) {
        this.barChartData.datasets[1].data = []
        this.barChartData.datasets[1].data?.push(resp.snow?.['1h'] )
      }


    })


  }

  changeGrafic(data: boolean) {
    this.tempOrRain = data
  }


  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'ºC',
        backgroundColor: '#A9D2DC',
        borderColor: '#517DAA',
        pointBackgroundColor: '#6DA2D8',
        pointBorderColor: '#415F7D',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#415F7D',
        fill: 'start',
      }
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0': {
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
        max: 10
      },

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
    labels: [' '],
    datasets: [
      {
        data: [],
        backgroundColor: '#AED6F1',
        hoverBackgroundColor: '#2980B9',
        label: 'l/h Rain'
      },
      {
        data: [],
        backgroundColor: '#D6DBDF',
        hoverBackgroundColor: '#34495E',
        label: 'l/h Snow'
      }
    ]
  };

}
