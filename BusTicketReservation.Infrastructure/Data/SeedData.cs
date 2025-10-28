using BusTicketReservation.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace BusTicketReservation.Infrastructure.Data;
public class SeedData
{
    public static async Task InitializeAsync(AppDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

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
            int seatsPerRow = bus.BusType.Contains("Sleeper") ? 4 : 5;
            int seatCounter = 1;

            for (int row = 1; row <= (bus.TotalSeats / seatsPerRow); row++)
            {
                for (int col = 1; col <= seatsPerRow && seatCounter <= bus.TotalSeats; col++)
                {
                    seats.Add(new Seat
                    {
                        Id = Guid.NewGuid(),
                        BusId = bus.Id,
                        SeatNumber = $"{seatCounter}",
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
        var routes = new List<Route>
        {
           new Route
            {
                Id = Guid.NewGuid(),
                FromCity = "Dhaka",
                ToCity = "Chittagong",
                BoardingPoints = "[\"Uttara\",\"Mohakhali\",\"Sayedabad\"]",
                DroppingPoints = "[\"GEC Circle\",\"Oxygen\",\"Agrabad\"]"
            },
            new Route
            {
                Id = Guid.NewGuid(),
                FromCity = "Dhaka",
                ToCity = "Sylhet",
                BoardingPoints = "[\"Uttara\",\"Mohakhali\",\"Abdullahpur\"]",
                DroppingPoints = "[\"Sylhet City\",\"Amberkhana\",\"Zindabazar\"]"
            },
            new Route
            {
                Id = Guid.NewGuid(),
                FromCity = "Dhaka",
                ToCity = "Rajshahi",
                BoardingPoints = "[\"Kalyanpur\",\"Gabtoli\",\"Savar\"]",
                DroppingPoints = "[\"Rajshahi City\",\"Shaheb Bazar\",\"Zero Point\"]"
            },
            new Route
            {
                Id = Guid.NewGuid(),
                FromCity = "Chittagong",
                ToCity = "Dhaka",
                BoardingPoints = "[\"GEC Circle\",\"Oxygen\",\"Agrabad\"]",
                DroppingPoints = "[\"Mohakhali\",\"Uttara\",\"Sayedabad\"]"
            },
            new Route
            {
                Id = Guid.NewGuid(),
                FromCity = "Rajshahi",
                ToCity = "Khulna",
                BoardingPoints = "[\"Rajshahi City\",\"Nawdapara\"]",
                DroppingPoints = "[\"Khulna City\",\"Sundarbans\"]"
            },
            new Route
            {
                Id = Guid.NewGuid(),
                FromCity = "Dhaka",
                ToCity = "Bogura",
                BoardingPoints = "[\"Kalyanpur\",\"Gabtoli\",\"Savar\"]",
                DroppingPoints = "[\"Sathmatha\",\"Banani\"]"
            },
            new Route
            {
                Id = Guid.NewGuid(),
                FromCity = "Bogura",
                ToCity = "Dhaka",
                BoardingPoints = "[\"Banani\",\"Sathmatha\"]",
                DroppingPoints = "[\"Kalyanpur\",\"Gabtoli\",\"Savar\"]"
            }
        };

        await context.Routes.AddRangeAsync(routes);
        await context.SaveChangesAsync();

        var schedules = new List<BusSchedule>();
        var random = new Random();
       
        var baseDate = DateTime.SpecifyKind(DateTime.UtcNow.Date, DateTimeKind.Utc);

        for (int day = 0; day < 7; day++) 
        {
            for (int i = 0; i < routes.Count; i++)
            {
                var bus = buses[i % buses.Count];
                var route = routes[i];

                schedules.Add(new BusSchedule
                {
                    Id = Guid.NewGuid(),
                    BusId = bus.Id,
                    RouteId = route.Id,
                    JourneyDate = baseDate.AddDays(day), 
                    StartTime = new TimeSpan(6, 0, 0),
                    ArrivalTime = new TimeSpan(12, 30, 0),
                    Price = 45.00m + (random.Next(0, 20) * 5)
                });

                // Evening schedule
                schedules.Add(new BusSchedule
                {
                    Id = Guid.NewGuid(),
                    BusId = bus.Id,
                    RouteId = route.Id,
                    JourneyDate = baseDate.AddDays(day), // stays UTC
                    StartTime = new TimeSpan(18, 0, 0),
                    ArrivalTime = new TimeSpan(23, 30, 0),
                    Price = 45.00m + (random.Next(0, 20) * 5)
                });
            }
        }

        await context.BusSchedules.AddRangeAsync(schedules);
        await context.SaveChangesAsync();
    }
}
