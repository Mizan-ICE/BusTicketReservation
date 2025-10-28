import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../services/bus.service';
import { Ticket } from '../../models/bus.model';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css']
})
export class BookingSuccessComponent implements OnInit {
  ticket: Ticket | null = null;
  tickets: any[] = [];  // Array of tickets with seat labels
  seatLabelsMap: Map<string, string> = new Map();
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busService: BusService
  ) {}

  ngOnInit(): void {
    // Check for navigation state with tickets (passed during navigation)
    const state = history.state;
    console.log('Navigation state:', state);
    
    if (state && state.tickets && state.tickets.length > 0) {
      this.tickets = state.tickets;
      const labelsArray = state.seatLabelsMap || [];
      this.seatLabelsMap = new Map(labelsArray);
      this.ticket = this.tickets[0];  // Set first ticket for backward compatibility
      this.loading = false;
      console.log('Loaded tickets from state:', this.tickets);
      return;
    }

    // Otherwise, try to load from route param (old flow)
    const ticketId = this.route.snapshot.paramMap.get('id');
    if (ticketId) {
      this.loadTicket(ticketId);
    } else {
      this.errorMessage = 'Invalid ticket ID';
      this.loading = false;
    }
  }

  loadTicket(ticketId: string): void {
    this.busService.getTicket(ticketId).subscribe({
      next: (ticket) => {
        this.ticket = ticket;
        this.tickets = [ticket];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading ticket:', error);
        this.errorMessage = 'Failed to load ticket details';
        this.loading = false;
      }
    });
  }

  getSeatLabel(ticket: any): string {
    // Return seatLabel if available, otherwise return seatNumber
    return ticket.seatLabel || ticket.seatNumber;
  }

  printTicket(): void {
    window.print();
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusText(status: number): string {
    switch(status) {
      case 0: return 'Pending';
      case 1: return 'Confirmed';
      case 2: return 'Cancelled';
      default: return 'Unknown';
    }
  }

  getStatusClass(status: number): string {
    switch(status) {
      case 0: return 'status-pending';
      case 1: return 'status-confirmed';
      case 2: return 'status-cancelled';
      default: return '';
    }
  }
}
