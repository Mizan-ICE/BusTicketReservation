namespace BusTicketReservation.Application.Contracts.DTOs;

public class AvailableBusDto
{
    public Guid BusScheduleId { get; set; }
    public string CompanyName { get; set; }
    public string BusName { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan ArrivalTime { get; set; }
    public int SeatsLeft { get; set; }
    public decimal Price { get; set; }
}