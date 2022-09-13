import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { TableFiveDaysComponent } from './components/table-five-days/table-five-days.component';
 
import { NgChartsModule } from 'ng2-charts';
import { CardsFiveDaysComponent } from './components/cards-five-days/cards-five-days.component';
import { NgPrimeModule } from './ng-prime/ng-prime.module';
import { MapBoxComponent } from './components/map-box/map-box.component';
import { SearchComponent } from './components/search/search.component'; 
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocationCardComponent,
    TableFiveDaysComponent,
    CardsFiveDaysComponent,
    MapBoxComponent,
    SearchComponent 
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    HttpClientModule,
    NgPrimeModule,
    FormsModule     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
