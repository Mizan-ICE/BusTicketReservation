using BusTicketReservation.Application.Contracts.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusTicketReservation.Application.Contracts.Services;
public interface ISearchService
{
    Task<List<AvailableBusDto>> SearchAvailableBusesAsync(
            string from,
            string to,
            DateTime journeyDate);
}
