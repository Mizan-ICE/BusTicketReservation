using BusTicketReservation.Application.Contracts.Repositories;

namespace BusTicketReservation.Application.Contracts;

public interface IUnitOfWork
{
    IBusScheduleRepository BusSchedules { get; }
    
    Task SaveChangesAsync();
    
}