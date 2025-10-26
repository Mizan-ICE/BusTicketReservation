namespace BusTicketReservation.Domain.Entities;

public sealed class Route : IEntity<Guid>
{
    public Guid Id { get; set; }
    public string FromCity { get; set; }
    public string ToCity { get; set; }
    public string BoardingPoints { get; set; } // JSON array
    public string DroppingPoints { get; set; } // JSON array

    public  ICollection<BusSchedule> Schedules { get; set; }
}