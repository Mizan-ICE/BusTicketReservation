namespace BusTicketReservation.Application.Contracts.DTOs;

public class BookTicketRequest
{
    public Guid BusScheduleId { get; set; }
    public Guid SeatId { get; set; }
    public string BoardingPoint { get; set; }
    public string DroppingPoint { get; set; }
}