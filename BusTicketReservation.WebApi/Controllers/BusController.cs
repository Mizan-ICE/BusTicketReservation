using BusTicketReservation.Application.Contracts;
using BusTicketReservation.Application.Contracts.DTOs;
using BusTicketReservation.Application.Contracts.Enums;
using BusTicketReservation.Application.Contracts.Services;
using BusTicketReservation.Domain.Entities;
using BusTicketReservation.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace BusTicketReservation.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BusController : ControllerBase
{
    private readonly ISearchService _searchService;

    private readonly ILogger<BusController> _logger;

    public BusController(
        ISearchService searchService,
        ILogger<BusController> logger)
    {
        _searchService = searchService;
   
        _logger = logger;
    }

    [HttpGet("Availablebus")]
    public async Task<IActionResult> SearchAvailableBuses([FromQuery] string from, [FromQuery] string to, [FromQuery] DateTime journeyDate)
    {
        try
        {
            var availableBuses = await _searchService.SearchAvailableBusesAsync(from, to, journeyDate);
            return Ok(availableBuses);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching for available buses");
            return StatusCode(500, new { message = "An error occurred while searching for buses." });
        }
    }
}

