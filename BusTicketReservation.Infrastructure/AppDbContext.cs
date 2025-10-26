using BusTicketReservation.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusTicketReservation.Infrastructure;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Bus> Buses { get; set; }
    public DbSet<Route> Routes { get; set; }
    public DbSet<BusSchedule> BusSchedules { get; set; }
    public DbSet<Seat> Seats { get; set; }
    public DbSet<Ticket> Tickets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure table names (PostgreSQL convention: lowercase with underscores)
        modelBuilder.Entity<Bus>().ToTable("buses");
        modelBuilder.Entity<Route>().ToTable("routes");
        modelBuilder.Entity<BusSchedule>().ToTable("bus_schedules");
        modelBuilder.Entity<Seat>().ToTable("seats");
        modelBuilder.Entity<Ticket>().ToTable("tickets");

        // Configure relationships
        modelBuilder.Entity<Bus>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasMany(e => e.Seats)
                .WithOne(e => e.Bus)
                .HasForeignKey(e => e.BusId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasMany(e => e.Schedules)
                .WithOne(e => e.Bus)
                .HasForeignKey(e => e.BusId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Route>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasMany(e => e.Schedules)
                .WithOne(e => e.Route)
                .HasForeignKey(e => e.RouteId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<BusSchedule>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Price)
                .HasColumnType("decimal(18,2)");
            entity.Property(e => e.JourneyDate).HasColumnType("date"); // map as date
            entity.HasMany(e => e.Tickets)
                .WithOne(e => e.BusSchedule)
                .HasForeignKey(e => e.BusScheduleId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        modelBuilder.Entity<BusSchedule>(entity =>
        modelBuilder.Entity<Seat>(entity =>
        {
            entity.HasKey(e => e.Id);
        }));

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Seat)
                .WithMany()
                .HasForeignKey(e => e.SeatId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}


