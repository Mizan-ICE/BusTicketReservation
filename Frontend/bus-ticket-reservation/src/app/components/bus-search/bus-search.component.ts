import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusService } from '../../services/bus.service';
import { AvailableBus } from '../../models/bus.model';

@Component({
  selector: 'app-bus-search',
  templateUrl: './bus-search.component.html',
  styleUrls: ['./bus-search.component.css']
})
export class BusSearchComponent implements OnInit {
  searchForm!: FormGroup;
  availableBuses: AvailableBus[] = [];
  loading = false;
  searched = false;
  errorMessage = '';

  // Popular cities for quick selection
  cities = [
    'Dhaka',
    'Chittagong',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Bogura',
    'Barisal',
    'Rangpur'
  ];

  constructor(
    private fb: FormBuilder,
    private busService: BusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    
    this.searchForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      journeyDate: [today, Validators.required]
    });

    // Watch for changes to validate same city selection
    this.searchForm.get('from')?.valueChanges.subscribe(() => {
      this.validateCities();
    });

    this.searchForm.get('to')?.valueChanges.subscribe(() => {
      this.validateCities();
    });
  }

  validateCities(): void {
    const from = this.searchForm.get('from')?.value;
    const to = this.searchForm.get('to')?.value;
    
    if (from && to && from === to) {
      this.searchForm.get('to')?.setErrors({ sameCity: true });
    } else if (this.searchForm.get('to')?.errors?.['sameCity']) {
      // Clear the sameCity error if cities are different now
      const errors = this.searchForm.get('to')?.errors;
      if (errors) {
        delete errors['sameCity'];
        const hasOtherErrors = Object.keys(errors).length > 0;
        this.searchForm.get('to')?.setErrors(hasOtherErrors ? errors : null);
      }
    }
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      this.markFormGroupTouched(this.searchForm);
      this.errorMessage = this.getValidationError();
      return;
    }

    const { from, to, journeyDate } = this.searchForm.value;

    // Additional validation
    if (from === to) {
      this.errorMessage = '❌ Departure and destination cities cannot be the same!';
      return;
    }

    // Check if date is in the past
    const selectedDate = new Date(journeyDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      this.errorMessage = '❌ Journey date cannot be in the past!';
      return;
    }

    // Proceed with search
    this.loading = true;
    this.errorMessage = '';
    this.searched = true;

    this.busService.searchBuses(from, to, journeyDate).subscribe({
      next: (buses) => {
        this.availableBuses = buses;
        this.loading = false;
        if (buses.length === 0) {
          this.errorMessage = `🚌 No buses found from ${from} to ${to} on ${this.formatDate(journeyDate)}.`;
        }
      },
      error: (error) => {
        console.error('Search error:', error);
        this.errorMessage = '❌ An error occurred while searching for buses. Please try again.';
        this.loading = false;
      }
    });
  }

  getValidationError(): string {
    if (this.searchForm.get('from')?.invalid && this.searchForm.get('from')?.touched) {
      return '❌ Please select a departure city';
    }
    if (this.searchForm.get('to')?.invalid && this.searchForm.get('to')?.touched) {
      if (this.searchForm.get('to')?.errors?.['sameCity']) {
        return '❌ Departure and destination cities cannot be the same!';
      }
      return '❌ Please select a destination city';
    }
    if (this.searchForm.get('journeyDate')?.invalid && this.searchForm.get('journeyDate')?.touched) {
      return '❌ Please select a journey date';
    }
    return '❌ Please fill in all required fields';
  }

  viewSeats(busScheduleId: string): void {
    this.router.navigate(['/seats', busScheduleId]);
  }

  formatTime(time: string): string {
    // Convert "06:00:00" to "6:00 AM"
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
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
}
