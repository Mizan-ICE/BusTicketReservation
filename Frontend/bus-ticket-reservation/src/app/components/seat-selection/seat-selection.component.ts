import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { BusService } from '../../services/bus.service';
import { BusScheduleDetails, Seat, SeatStatus, BookTicketRequest, Ticket } from '../../models/bus.model';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  busScheduleId: string = '';
  busDetails: BusScheduleDetails | null = null;
  selectedSeat: Seat | null = null;
  selectedSeats: string[] = [];  // Seat numbers for display
  selectedSeatIds: string[] = [];  // Seat IDs for booking
  seatLabelsMap: Map<string, string> = new Map();  // Map seat ID to label
  bookingForm!: FormGroup;
  loading = false;
  bookingInProgress = false;
  errorMessage = '';
  successMessage = '';
  
  SeatStatus = SeatStatus;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private busService: BusService
  ) {}

  ngOnInit(): void {
    this.busScheduleId = this.route.snapshot.paramMap.get('id') || '';
    
    this.bookingForm = this.fb.group({
      passengerName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9+]{10,20}$/)]],
      boardingPoint: ['', Validators.required],
      droppingPoint: ['', Validators.required]
    });

    this.loadBusDetails();
  }

  loadBusDetails(): void {
    this.loading = true;
    this.errorMessage = '';

    this.busService.getBusScheduleDetails(this.busScheduleId).subscribe({
      next: (details) => {
        this.busDetails = details;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bus details:', error);
        this.errorMessage = 'Failed to load bus details. Please try again.';
        this.loading = false;
      }
    });
  }

  getSeatLayout(): Seat[][] {
    if (!this.busDetails || !this.busDetails.seats) return [];

    const maxRow = Math.max(...this.busDetails.seats.map(s => s.row));
    const maxCol = Math.max(...this.busDetails.seats.map(s => s.column));
    
    const layout: Seat[][] = [];
    
    for (let row = 1; row <= maxRow; row++) {
      const rowSeats: Seat[] = [];
      for (let col = 1; col <= maxCol; col++) {
        const seat = this.busDetails.seats.find(s => s.row === row && s.column === col);
        if (seat) {
          rowSeats.push(seat);
        }
      }
      if (rowSeats.length > 0) {
        layout.push(rowSeats);
      }
    }
    
    return layout;
  }

  selectSeat(seat: Seat): void {
    if (seat.status === SeatStatus.Available) {
      this.selectedSeat = seat;
      this.errorMessage = '';
    }
  }

  getSeatClass(seat: Seat): string {
    const classes = ['seat'];
    
    if (seat.status === SeatStatus.Available) {
      classes.push('available');
      if (this.selectedSeat?.id === seat.id) {
        classes.push('selected');
      }
    } else if (seat.status === SeatStatus.Booked) {
      classes.push('booked');
    } else if (seat.status === SeatStatus.Sold) {
      classes.push('sold');
    }
    
    return classes.join(' ');
  }

  getSeatIcon(seat: Seat): string {
    if (this.selectedSeat?.id === seat.id) return '?';
    if (seat.status === SeatStatus.Available) return '??';
    if (seat.status === SeatStatus.Booked) return '??';
    if (seat.status === SeatStatus.Sold) return '?';
    return '';
  }

  onBookTicket(): void {
    if (this.selectedSeatIds.length === 0) {
      this.errorMessage = 'Please select at least one seat.';
      return;
    }

    if (this.bookingForm.invalid) {
      this.markFormGroupTouched(this.bookingForm);
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    this.bookingInProgress = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Book all selected seats
    const bookingRequests = this.selectedSeatIds.map(seatId => {
      const bookingRequest: BookTicketRequest = {
        busScheduleId: this.busScheduleId,
        seatId: seatId,
        passengerName: this.bookingForm.value.passengerName,
        mobileNumber: this.bookingForm.value.mobileNumber,
        boardingPoint: this.bookingForm.value.boardingPoint,
        droppingPoint: this.bookingForm.value.droppingPoint
      };
      return this.busService.bookTicket(bookingRequest);
    });

    // Use forkJoin to wait for all bookings
    forkJoin(bookingRequests).subscribe({
      next: (tickets: Ticket[]) => {
        console.log('Booking successful! Tickets received:', tickets);
        this.successMessage = `Booking successful! ${tickets.length} seat(s) booked.`;
        this.bookingInProgress = false;
        
        // Add seat labels to tickets for display on success page
        const ticketsWithLabels = tickets.map((ticket, index) => ({
          ...ticket,
          seatLabel: this.seatLabelsMap.get(this.selectedSeatIds[index]) || ticket.seatNumber
        }));
        
        console.log('Tickets with labels:', ticketsWithLabels);
        console.log('Seat labels map:', Array.from(this.seatLabelsMap.entries()));
        
        // Navigate to success page with tickets and labels
        setTimeout(() => {
          console.log('Navigating to booking-success with state...');
          this.router.navigate(['/booking-success'], { 
            state: { 
              tickets: ticketsWithLabels,
              seatLabelsMap: Array.from(this.seatLabelsMap.entries())  // Convert Map to array for navigation
            }
          });
        }, 2000);
      },
      error: (error: any) => {
        console.error('Booking error:', error);
        this.errorMessage = error.error?.message || 'Booking failed. The seat(s) may no longer be available.';
        this.bookingInProgress = false;
        
        // Reload bus details to refresh seat availability
        this.loadBusDetails();
        this.selectedSeatIds = [];
        this.selectedSeats = [];
        this.selectedSeat = null;
        this.selectedSeat = null;
      }
    });
  }

  goBack(): void {
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
      day: 'numeric' 
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for seat-map component
  getBookedSeats(): string[] {
    if (!this.busDetails?.seats) return [];
    const booked = this.busDetails.seats
      .filter(s => s.status === SeatStatus.Booked || s.status === SeatStatus.Sold)
      .map(s => s.seatNumber);
    console.log('Booked seats from API:', booked);
    console.log('All seats from API:', this.busDetails.seats.map(s => `${s.seatNumber} (status: ${s.status})`));
    return booked;
  }

  onSeatsChanged(seatIds: string[]): void {
    console.log('=== onSeatsChanged ===');
    console.log('Received seat IDs:', seatIds);
    
    if (!this.busDetails?.seats) return;
    
    // Store seat IDs for booking
    this.selectedSeatIds = seatIds;
    
    // Find seats by ID and use the labels map
    const selectedSeatObjects = this.busDetails.seats.filter(s => seatIds.includes(s.id));
    
    // Use labels from the map if available, otherwise use seat numbers
    this.selectedSeats = seatIds.map(id => 
      this.seatLabelsMap.get(id) || selectedSeatObjects.find(s => s.id === id)?.seatNumber || ''
    ).filter(label => label !== '');
    
    // Update selectedSeat for backward compatibility
    this.selectedSeat = selectedSeatObjects.length > 0 ? selectedSeatObjects[0] : null;
    
    console.log('Selected seats:', this.selectedSeats);
    console.log('Selected seat objects:', selectedSeatObjects);
  }

  onSeatLabelsChanged(labelsMap: Map<string, string>): void {
    console.log('=== onSeatLabelsChanged ===');
    console.log('Received labels map:', labelsMap);
    this.seatLabelsMap = labelsMap;
    
    // Update selected seats display if any are selected
    if (this.selectedSeatIds.length > 0) {
      this.selectedSeats = this.selectedSeatIds.map(id => 
        this.seatLabelsMap.get(id) || ''
      ).filter(label => label !== '');
    }
  }
}
