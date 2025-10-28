using BusTicketReservation.Application.Contracts;
using BusTicketReservation.Application.Contracts.DTOs;
using BusTicketReservation.Application.Contracts.Services;
using BusTicketReservation.Domain.Enums;

namespace BusTicketReservation.Application.Services;

public class SearchService : ISearchService
{
    private readonly IUnitOfWork _unitOfWork;

    public SearchService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<List<AvailableBusDto>> SearchAvailableBusesAsync(
        string from,
        string to,
        DateTime journeyDate)
    {
        var requestedDate = journeyDate.Date;
        var todayUtc = DateTime.UtcNow.Date;

        if (requestedDate < todayUtc)
            throw new ArgumentException("Journey date cannot be in the past.");

        var schedules = await _unitOfWork.BusSchedules.GetSchedulesByRouteAndDateAsync(
            from,
            to,
            requestedDate);

        if (requestedDate == todayUtc)
        {
            var nowUtcTime = DateTime.UtcNow.TimeOfDay;
            schedules = schedules
                .Where(s => s.StartTime > nowUtcTime)
                .ToList();
        }

        var availableBuses = schedules
            .Select(schedule =>
            {
                var bookedSeats = schedule.Tickets?
                    .Count(t => t.Status == TicketStatus.Confirmed || t.Status == TicketStatus.Pending) ?? 0;

                var seatsLeft = schedule.Bus.TotalSeats - bookedSeats;

                return new AvailableBusDto
                {
                    BusScheduleId = schedule.Id,
                    CompanyName = schedule.Bus.CompanyName,
                    BusName = schedule.Bus.BusName,
                    StartTime = schedule.StartTime,
                    ArrivalTime = schedule.ArrivalTime,
                    SeatsLeft = seatsLeft,
                    Price = schedule.Price
                };
            })
            .Where(bus => bus.SeatsLeft > 0)
            .OrderBy(bus => bus.StartTime)
            .ToList();

        return availableBuses;
    }
}

