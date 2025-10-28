import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusSearchComponent } from './components/bus-search/bus-search.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { BookingSuccessComponent } from './components/booking-success/booking-success.component';
import { BusService } from './services/bus.service';
import { SeatMapComponent } from './components/seat-map/seat-map.component';

@NgModule({
  declarations: [
    AppComponent,
    BusSearchComponent,
    SeatSelectionComponent,
    BookingSuccessComponent,
    SeatMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [BusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
