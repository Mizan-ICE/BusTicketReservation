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
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.searched = true;
      
      const { from, to, journeyDate } = this.searchForm.value;

      this.busService.searchBuses(from, to, journeyDate).subscribe({
        next: (buses) => {
          this.availableBuses = buses;
          this.loading = false;
          if (buses.length === 0) {
            this.errorMessage = 'No buses found for the selected route and date.';
          }
        },
        error: (error) => {
          console.error('Search error:', error);
          this.errorMessage = 'An error occurred while searching for buses. Please try again.';
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.searchForm);
    }
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

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
