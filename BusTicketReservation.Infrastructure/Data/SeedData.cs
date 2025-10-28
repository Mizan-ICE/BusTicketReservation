using BusTicketReservation.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace BusTicketReservation.Infrastructure.Data;

public static class SeedData
{
    public static async Task InitializeAsync(AppDbContext context)
    {
        
        if (await context.Buses.AnyAsync())
        {
            return; 
        }

        var buses = new List<Bus>
        {
            new Bus
            {
                Id = Guid.NewGuid(),
                CompanyName = "Green Line Paribahan",
                BusName = "Dhaka Express",
                TotalSeats = 40,
                BusType = "AC"
            },
            new Bus
            {
                Id = Guid.NewGuid(),
                CompanyName = "Hanif Enterprise",
                BusName = "Royal Coach",
                TotalSeats = 36,
                BusType = "AC Sleeper"
            },
            new Bus
            {
                Id = Guid.NewGuid(),
                CompanyName = "Shyamoli Paribahan",
                BusName = "Shyamoli Deluxe",
                TotalSeats = 40,
                BusType = "Non-AC"
            },
            new Bus
            {
                Id = Guid.NewGuid(),
                CompanyName = "Ena Transport",
                BusName = "Ena Premium",
                TotalSeats = 32,
                BusType = "AC"
            },
            new Bus
            {
                Id = Guid.NewGuid(),
                CompanyName = "Sohag Paribahan",
                BusName = "Sohag Special",
                TotalSeats = 40,
                BusType = "AC"
            }
        };

        await context.Buses.AddRangeAsync(buses);
        await context.SaveChangesAsync();

        // Seed Seats for each bus
        var seats = new List<Seat>();
        foreach (var bus in buses)
        {
            var seatsPerRow = bus.BusType.Contains("Sleeper", StringComparison.OrdinalIgnoreCase) ? 4 : 5;
            var totalRows = (int)Math.Ceiling((double)bus.TotalSeats / seatsPerRow);
            var seatCounter = 1;

            for (var row = 1; row <= totalRows; row++)
            {
                for (var col = 1; col <= seatsPerRow && seatCounter <= bus.TotalSeats; col++)
                {
                    seats.Add(new Seat
                    {
                        Id = Guid.NewGuid(),
                        BusId = bus.Id,
                        SeatNumber = seatCounter.ToString(),
                        Row = row,
                        Column = col
                    });
                    seatCounter++;
                }
            }
        }

        await context.Seats.AddRangeAsync(seats);
        await context.SaveChangesAsync();

        // Seed Routes
        static string J(params string[] points) => JsonSerializer.Serialize(points);

        var routes = new List<Route>
        {
            new Route
            {
                Id = Guid.NewGuid(),
                FromCity = "Dhaka",
                ToCity = "Chittagong",
                BoardingPoints = J("Uttara","Mohakhali","Sayedabad"),
                DroppingPoints = J("GEC Circle","Oxygen","Agrabad")
            },
            new Route
            {
                Id = Guid.NewGuid(),
                FromCity = "Dhaka",
                ToCity = "Sylhet",
                BoardingPoints = J("Uttara","Mohakhali","Abdullahpur"),
                DroppingPoints = J("Sylhet City","Amberkhana","Zindabazar")
            },
            new Route
            {
                Id = Guid.NewGuid(),
                FromCity = "Dhaka",
                ToCity = "Rajshahi",
                BoardingPoints = J("Kalyanpur","Gabtoli","Savar"),
                DroppingPoints = J("Rajshahi City","Shaheb Bazar","Zero Point")
            },
            new Route
            {
                Id = Guid.NewGuid(),
                FromCity = "Chittagong",
                ToCity = "Dhaka",
                BoardingPoints = J("GEC Circle","Oxygen","Agrabad"),
                DroppingPoints = J("Mohakhali","Uttara","Sayedabad")
            },
            new Route
            {
                Id = Guid.NewGuid(),
                FromCity = "Rajshahi",
                ToCity = "Khulna",
                BoardingPoints = J("Rajshahi City","Nawdapara"),
                DroppingPoints = J("Khulna City","Sundarbans")
            },
            new Route
            {
                Id = Guid.NewGuid(),
                FromCity = "Dhaka",
                ToCity = "Bogura",
                BoardingPoints = J("Kalyanpur","Gabtoli","Savar"),
                DroppingPoints = J("Sathmatha","Banani")
            },
            new Route
            {
                Id = Guid.NewGuid(),
                FromCity = "Bogura",
                ToCity = "Dhaka",
                BoardingPoints = J("Banani","Sathmatha"),
                DroppingPoints = J("Kalyanpur","Gabtoli","Savar")
            }
        };

        await context.Routes.AddRangeAsync(routes);
        await context.SaveChangesAsync();

        // Seed Schedules
        var schedules = new List<BusSchedule>();
        var baseDate = DateTime.SpecifyKind(DateTime.UtcNow.Date, DateTimeKind.Utc);
        var rng = Random.Shared;

        var scheduleTemplates = new (TimeSpan Start, TimeSpan Arrive, decimal BasePrice)[]
        {
            (new TimeSpan(6, 0, 0),  new TimeSpan(12, 30, 0), 500.00m),
            (new TimeSpan(18, 0, 0), new TimeSpan(23, 30, 0), 600.00m)
        };

        for (var day = 0; day < 7; day++)
        {
            for (var i = 0; i < routes.Count; i++)
            {
                var bus = buses[i % buses.Count];
                var route = routes[i];

                foreach (var t in scheduleTemplates)
                {
                    schedules.Add(new BusSchedule
                    {
                        Id = Guid.NewGuid(),
                        BusId = bus.Id,
                        RouteId = route.Id,
                        JourneyDate = baseDate.AddDays(day),
                        StartTime = t.Start,
                        ArrivalTime = t.Arrive,
                        Price = t.BasePrice + (rng.Next(0, 20) * 5)
                    });
                }
            }
        }

        await context.BusSchedules.AddRangeAsync(schedules);
        await context.SaveChangesAsync();
    }
}
