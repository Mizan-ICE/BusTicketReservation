namespace BusTicketReservation.Application.Contracts.DTOs;

public class BusScheduleDetailsDto
{
    public Guid Id { get; set; }
    public string CompanyName { get; set; }
    public string BusName { get; set; }
    public string BusType { get; set; }
    public int TotalSeats { get; set; }
    public string FromCity { get; set; }
    public string ToCity { get; set; }
    public DateTime JourneyDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan ArrivalTime { get; set; }
    public decimal Price { get; set; }
    public List<string> BoardingPoints { get; set; }
    public List<string> DroppingPoints { get; set; }
    public List<SeatDto> Seats { get; set; }
}