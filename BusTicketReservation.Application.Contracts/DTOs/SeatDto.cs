using BusTicketReservation.Application.Contracts.Enums;

namespace BusTicketReservation.Application.Contracts.DTOs;

public class SeatDto
{
    public Guid Id { get; set; }
    public string SeatNumber { get; set; }
    public int Row { get; set; }
    public int Column { get; set; }
    public SeatStatus Status { get; set; }
}