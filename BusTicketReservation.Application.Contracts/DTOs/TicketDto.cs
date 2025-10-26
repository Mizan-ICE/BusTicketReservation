using BusTicketReservation.Domain.Enums;

namespace BusTicketReservation.Application.Contracts.DTOs;

public class TicketDto
{
    public Guid Id { get; set; }
    public Guid BusScheduleId { get; set; }
    public string CompanyName { get; set; }
    public string BusName { get; set; }
    public string FromCity { get; set; }
    public string ToCity { get; set; }
    public DateTime JourneyDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan ArrivalTime { get; set; }
    public string SeatNumber { get; set; }
    public string BoardingPoint { get; set; }
    public string DroppingPoint { get; set; }
    public decimal Price { get; set; }
    public DateTime BookingDate { get; set; }
    public TicketStatus Status { get; set; }
}