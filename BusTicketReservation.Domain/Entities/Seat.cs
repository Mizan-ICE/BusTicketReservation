namespace BusTicketReservation.Domain.Entities;

public sealed class Seat: IEntity<Guid>
{
    public Guid Id { get; set; }
    public Guid BusId { get; set; }
    public string SeatNumber { get; set; }
    public int Row { get; set; }
    public int Column { get; set; }

    public  Bus Bus { get; set; }
}