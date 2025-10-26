namespace BusTicketReservation.Domain.Entities;

public sealed class Bus : IEntity<Guid>
{
    public Guid Id { get; set; }
    public string CompanyName { get; set; }
    public string BusName { get; set; }
    public int TotalSeats { get; set; }
    public string BusType { get; set; }

    public  ICollection<Seat> Seats { get; set; }
    public  ICollection<BusSchedule> Schedules { get; set; }
}