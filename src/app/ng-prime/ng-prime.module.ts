import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import {ButtonModule} from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import {InputTextModule} from 'primeng/inputtext';

import {OrderListModule} from 'primeng/orderlist';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    InputTextModule,
    OrderListModule 
  ],
  exports: [
    CarouselModule,
    ButtonModule,
    InputTextModule,
    OrderListModule 
  ]
})
export class NgPrimeModule { }
