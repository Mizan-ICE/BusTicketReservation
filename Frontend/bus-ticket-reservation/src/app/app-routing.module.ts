import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusSearchComponent } from './components/bus-search/bus-search.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { BookingSuccessComponent } from './components/booking-success/booking-success.component';

const routes: Routes = [
  { path: '', component: BusSearchComponent },
  { path: 'seats/:id', component: SeatSelectionComponent },
  { path: 'booking-success/:id', component: BookingSuccessComponent },
  { path: 'booking-success', component: BookingSuccessComponent },  // For state-based navigation
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
