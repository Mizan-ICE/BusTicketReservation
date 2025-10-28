export interface AvailableBus {
  busScheduleId: string;
  companyName: string;
  busName: string;
  startTime: string;
  arrivalTime: string;
  seatsLeft: number;
  price: number;
}

export interface BusScheduleDetails {
  id: string;
  companyName: string;
  busName: string;
  busType: string;
  totalSeats: number;
  fromCity: string;
  toCity: string;
  journeyDate: string;
  startTime: string;
  arrivalTime: string;
  price: number;
  boardingPoints: string[];
  droppingPoints: string[];
  seats: Seat[];
}

export interface Seat {
  id: string;
  seatNumber: string;
  row: number;
  column: number;
  status: SeatStatus;
}

export enum SeatStatus {
  Available = 0,
  Booked = 1,
  Sold = 2
}

export interface BookTicketRequest {
  busScheduleId: string;
  seatId: string;
  passengerName: string;
  mobileNumber: string;
  boardingPoint: string;
  droppingPoint: string;
}

export interface Ticket {
  id: string;
  busScheduleId: string;
  companyName: string;
  busName: string;
  fromCity: string;
  toCity: string;
  journeyDate: string;
  startTime: string;
  arrivalTime: string;
  seatNumber: string;
  passengerName: string;
  mobileNumber: string;
  boardingPoint: string;
  droppingPoint: string;
  price: number;
  bookingDate: string;
  status: number;
}
