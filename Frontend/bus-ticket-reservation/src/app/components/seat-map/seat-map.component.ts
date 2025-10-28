import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Seat, SeatStatus } from '../../models/bus.model';

export interface SeatLayout {
  rows: string[];          
  seatsPerRow: number[];    
  aisleAfter?: number;      
}

@Component({
  selector: 'app-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.css']
})
export class SeatMapComponent {
  @Input() seats: Seat[] = [];  // Pass actual API seats
  @Input() disabled = false;
  @Input() multiSelect = false;
  @Output() selectionChange = new EventEmitter<string[]>();
  @Output() seatLabelsChange = new EventEmitter<Map<string, string>>();  // Map seat ID to label

  selected = new Set<string>();
  seatLabelsMap = new Map<string, string>();  // Store seat ID -> label mapping
  SeatStatus = SeatStatus;

  // Generate 2+2 layout with A1, A2, A3, A4 naming
  get seatLayout(): { seat: Seat; label: string; isAisle?: boolean }[][] {
    if (!this.seats || this.seats.length === 0) return [];
    
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
    const layout: { seat: Seat; label: string; isAisle?: boolean }[][] = [];
    
    // Clear and rebuild the label map
    this.seatLabelsMap.clear();
    
    // Sort seats by row and column
    const sortedSeats = [...this.seats].sort((a, b) => {
      if (a.row !== b.row) return a.row - b.row;
      return a.column - b.column;
    });
    
    // Group by rows
    const maxRow = Math.max(...this.seats.map(s => s.row));
    
    for (let rowNum = 1; rowNum <= maxRow; rowNum++) {
      const rowSeats = sortedSeats.filter(s => s.row === rowNum);
      if (rowSeats.length === 0) continue;
      
      const rowLabel = rows[rowNum - 1] || `R${rowNum}`;
      const rowLayout: { seat: Seat; label: string; isAisle?: boolean }[] = [];
      
      // 2+2 layout: Only process first 4 seats per row
      const seatsToDisplay = rowSeats.slice(0, 4);
      
      seatsToDisplay.forEach((seat, idx) => {
        const seatLabel = `${rowLabel}${idx + 1}`;
        // Store mapping of seat ID to label
        this.seatLabelsMap.set(seat.id, seatLabel);
        rowLayout.push({ seat, label: seatLabel });
        
        // Add aisle after 2nd seat (after A2, before A3)
        if (idx === 1 && seatsToDisplay.length > 2) {
          rowLayout.push({ seat: seat, label: '', isAisle: true });
        }
      });
      
      layout.push(rowLayout);
    }
    
    // Emit the label map whenever layout is generated
    this.seatLabelsChange.emit(this.seatLabelsMap);
    
    return layout;
  }

  isBooked(seat: Seat): boolean {
    return seat.status === SeatStatus.Booked || seat.status === SeatStatus.Sold;
  }

  isSelected(seat: Seat): boolean {
    return this.selected.has(seat.id);
  }

  toggleSeat(seat: Seat) {
    console.log('toggleSeat called:', seat.seatNumber, 'Status:', seat.status);
    if (this.disabled || this.isBooked(seat)) {
      console.log('Seat disabled or booked');
      return;
    }
    
    // Single selection mode - clear others first
    if (!this.multiSelect) {
      this.selected.clear();
    }
    
    // Toggle selection using seat ID
    if (this.selected.has(seat.id)) {
      this.selected.delete(seat.id);
    } else {
      this.selected.add(seat.id);
    }
    
    console.log('Selected seat IDs:', [...this.selected]);
    // Emit seat IDs, not labels
    this.selectionChange.emit([...this.selected]);
  }

  getSeatClass(seat: Seat): string {
    const classes = ['seat'];
    if (this.isBooked(seat)) {
      classes.push('booked');
    } else if (this.isSelected(seat)) {
      classes.push('selected');
    } else {
      classes.push('available');
    }
    return classes.join(' ');
  }

  getSeatIcon(seat: Seat): string {
    if (this.isSelected(seat)) return '✓';
    if (seat.status === SeatStatus.Available) return '💺';
    if (seat.status === SeatStatus.Booked) return '🔒';
    if (seat.status === SeatStatus.Sold) return '✖';
    return '';
  }

  trackByIndex = (_: number, v: any) => v;
  trackBySeatId = (_: number, seat: Seat) => seat.id;
}