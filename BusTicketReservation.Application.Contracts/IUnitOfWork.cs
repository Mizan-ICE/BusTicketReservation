using BusTicketReservation.Application.Contracts.Repositories;
using Microsoft.EntityFrameworkCore.Storage;

namespace BusTicketReservation.Application.Contracts;

public interface IUnitOfWork
{
    IBusScheduleRepository BusSchedules { get; }
    
    Task SaveChangesAsync();
    
    Task<IDbContextTransaction> BeginTransactionAsync();
}