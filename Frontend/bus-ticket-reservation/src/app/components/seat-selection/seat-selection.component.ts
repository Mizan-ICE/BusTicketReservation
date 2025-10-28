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
        this.successMessage = `Booking successful! ${tickets.length} seat(s) booked.`;
        this.bookingInProgress = false;
        
        // Add seat labels to tickets for display on success page
        const ticketsWithLabels = tickets.map((ticket, index) => ({
          ...ticket,
          seatLabel: this.seatLabelsMap.get(this.selectedSeatIds[index]) || ticket.seatNumber
        }));
        
        // Navigate to success page with tickets and labels
        setTimeout(() => {
          this.router.navigate(['/booking-success'], { 
            state: { 
              tickets: ticketsWithLabels,
              seatLabelsMap: Array.from(this.seatLabelsMap.entries())
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

  onSeatsChanged(seatIds: string[]): void {
    if (!this.busDetails?.seats) return;
    
    this.selectedSeatIds = seatIds;
    const selectedSeatObjects = this.busDetails.seats.filter(s => seatIds.includes(s.id));
    
    // Use labels from the map if available, otherwise use seat numbers
    this.selectedSeats = seatIds.map(id => 
      this.seatLabelsMap.get(id) || selectedSeatObjects.find(s => s.id === id)?.seatNumber || ''
    ).filter(label => label !== '');
    
    // Update selectedSeat for backward compatibility
    this.selectedSeat = selectedSeatObjects.length > 0 ? selectedSeatObjects[0] : null;
  }

  onSeatLabelsChanged(labelsMap: Map<string, string>): void {
    this.seatLabelsMap = labelsMap;
    
    // Update selected seats display if any are selected
    if (this.selectedSeatIds.length > 0) {
      this.selectedSeats = this.selectedSeatIds.map(id => 
        this.seatLabelsMap.get(id) || ''
      ).filter(label => label !== '');
    }
  }
}
