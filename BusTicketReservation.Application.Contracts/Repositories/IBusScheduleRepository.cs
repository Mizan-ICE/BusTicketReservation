using BusTicketReservation.Domain.Entities;

namespace BusTicketReservation.Application.Contracts.Repositories;

public interface IBusScheduleRepository : IRepository<BusSchedule, Guid>
{
    Task<List<BusSchedule>> GetSchedulesByRouteAndDateAsync(
        string fromCity,
        string toCity,
        DateTime journeyDate);

    Task AddTicketAsync(Ticket ticket);
    Task<Ticket?> GetTicketByIdAsync(Guid ticketId);
}