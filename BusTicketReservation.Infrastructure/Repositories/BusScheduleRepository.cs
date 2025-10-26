using BusTicketReservation.Domain.Entities;
using BusTicketReservation.Application.Contracts.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BusTicketReservation.Infrastructure.Repositories;

public class BusScheduleRepository : Repository<BusSchedule, Guid>, IBusScheduleRepository
{
    private readonly AppDbContext _context;

    public BusScheduleRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<BusSchedule>> GetSchedulesByRouteAndDateAsync(
        string fromCity, 
        string toCity, 
        DateTime journeyDate)
    {
        return await _context.Set<BusSchedule>()
            .Include(bs => bs.Bus)
            .Include(bs => bs.Route)
            .Include(bs => bs.Tickets)
            .Where(bs => bs.Route.FromCity == fromCity 
                      && bs.Route.ToCity == toCity 
                      && bs.JourneyDate.Date == journeyDate.Date)
            .ToListAsync();
    }

    public async Task AddTicketAsync(Ticket ticket)
    {
        await _context.Set<Ticket>().AddAsync(ticket);
    }

    public async Task<Ticket?> GetTicketByIdAsync(Guid ticketId)
    {
        return await _context.Set<Ticket>()
            .Include(t => t.BusSchedule)
                .ThenInclude(bs => bs.Bus)
            .Include(t => t.BusSchedule)
                .ThenInclude(bs => bs.Route)
            .Include(t => t.Seat)
            .FirstOrDefaultAsync(t => t.Id == ticketId);
    }
}