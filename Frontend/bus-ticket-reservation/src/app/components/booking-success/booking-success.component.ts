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
  successMessage = '';
  cancellingTicketId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busService: BusService
  ) {}

  ngOnInit(): void {
    // Check for navigation state with tickets (passed during navigation)
    const state = history.state;
    
    if (state && state.tickets && state.tickets.length > 0) {
      this.tickets = state.tickets;
      const labelsArray = state.seatLabelsMap || [];
      this.seatLabelsMap = new Map(labelsArray);
      this.ticket = this.tickets[0];
      this.loading = false;
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

  cancelTicket(ticketId: string): void {
    if (!confirm('Are you sure you want to cancel this ticket?')) {
      return;
    }

    this.cancellingTicketId = ticketId;
    this.errorMessage = '';
    this.successMessage = '';

    this.busService.cancelTicket(ticketId).subscribe({
      next: () => {
        this.successMessage = 'Ticket cancelled successfully!';
        this.cancellingTicketId = null;
        
        // Update the ticket status in the tickets array
        const ticketIndex = this.tickets.findIndex(t => t.id === ticketId);
        if (ticketIndex !== -1) {
          this.tickets[ticketIndex].status = 2; // Cancelled
        }
        
        // Update main ticket if it's the one being cancelled
        if (this.ticket?.id === ticketId) {
          this.ticket.status = 2;
        }

        // Redirect to home after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (error) => {
        console.error('Error cancelling ticket:', error);
        this.errorMessage = error.message || 'Failed to cancel ticket. Please try again.';
        this.cancellingTicketId = null;
      }
    });
  }

  canCancelTicket(ticket: any): boolean {
    // Can only cancel tickets that are Pending (0) or Confirmed (1)
    return ticket.status === 0 || ticket.status === 1;
  }

  isCancelling(ticketId: string): boolean {
    return this.cancellingTicketId === ticketId;
  }
}
