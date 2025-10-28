using BusTicketReservation.Application.Contracts;
using BusTicketReservation.Application.Contracts.Repositories;
using BusTicketReservation.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore.Storage;

namespace BusTicketReservation.Infrastructure;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    public UnitOfWork(AppDbContext context, IBusScheduleRepository busScheduleRepository)
    {
        _context = context;
        BusSchedules = busScheduleRepository;
    }

    public IBusScheduleRepository BusSchedules { get; private set; }

    public async Task SaveChangesAsync()
    {
       await _context.SaveChangesAsync();
    }

    public async Task<IDbContextTransaction> BeginTransactionAsync()
    {
        return await _context.Database.BeginTransactionAsync();
    }
}