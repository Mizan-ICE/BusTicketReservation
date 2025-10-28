import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AvailableBus, BusScheduleDetails, BookTicketRequest, Ticket } from '../models/bus.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BusService {
  private baseUrl = environment.apiBaseUrl; // '/api'

  constructor(private http: HttpClient) {}

  searchBuses(from: string, to: string, journeyDate: string): Observable<AvailableBus[]> {
    const params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('journeyDate', journeyDate);

    return this.http
      .get<AvailableBus[]>(`${this.baseUrl}/Bus/Availablebus`, { params })
      .pipe(catchError(this.handleError));
  }

  private handleError = (err: HttpErrorResponse) => {
    if (err.status === 0) {
      return throwError(() => new Error('Cannot reach API (server down, CORS, or network).'));
    }
    const msg = err.error?.message || err.message || 'Request failed';
    return throwError(() => new Error(`HTTP ${err.status} ${err.statusText}: ${msg}`));
  };

  getBusScheduleDetails(busScheduleId: string): Observable<BusScheduleDetails> {
    return this.http
      .get<BusScheduleDetails>(`${this.baseUrl}/Booking/schedule/${busScheduleId}`)
      .pipe(catchError(this.handleError));
  }

  bookTicket(bookingData: BookTicketRequest): Observable<Ticket> {
    return this.http
      .post<Ticket>(`${this.baseUrl}/Booking/book`, bookingData)
      .pipe(catchError(this.handleError));
  }

  getTicket(ticketId: string): Observable<Ticket> {
    return this.http
      .get<Ticket>(`${this.baseUrl}/Booking/${ticketId}`)
      .pipe(catchError(this.handleError));
  }

  cancelTicket(ticketId: string): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/Booking/${ticketId}/cancel`)
      .pipe(catchError(this.handleError));
  }
}
