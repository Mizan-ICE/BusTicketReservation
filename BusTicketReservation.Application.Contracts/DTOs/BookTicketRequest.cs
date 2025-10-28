using System.ComponentModel.DataAnnotations;

namespace BusTicketReservation.Application.Contracts.DTOs;

public class BookTicketRequest
{
    [Required]
    public Guid BusScheduleId { get; set; }
    
    [Required]
    public Guid SeatId { get; set; }
    
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string PassengerName { get; set; }
    
    [Required]
    [Phone]
    [StringLength(20, MinimumLength = 10)]
    public string MobileNumber { get; set; }
    
    [Required]
    [StringLength(200)]
    public string BoardingPoint { get; set; }
    
    [Required]
    [StringLength(200)]
    public string DroppingPoint { get; set; }
}