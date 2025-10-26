using BusTicketReservation.Domain.Enums;

namespace BusTicketReservation.Domain.Entities;

public sealed class Ticket:IEntity<Guid>
{
    public Guid Id { get; set; }
    public Guid BusScheduleId { get; set; }
    public Guid SeatId { get; set; }
    public string BoardingPoint { get; set; }
    public string DroppingPoint { get; set; }
    public DateTime BookingDate { get; set; }
    public TicketStatus Status { get; set; }

    public BusSchedule BusSchedule { get; set; }
    public Seat Seat { get; set; }
}