using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace Backend.ApplicationDBContext
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Aircraft> Aircrafts { get; set; }
        public DbSet<Airport> Airports { get; set; }
        public DbSet<CheckIn> CheckIns { get; set; }
        public DbSet<Discounts> Discounts { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserTicket> UserTickets { get; set; }
        public DbSet<FlightTicket> FlightTickets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=AirlineCompanyDB;Trusted_Connection=True;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Flight>()
                .HasOne(f => f.DepartingAirport)
                .WithMany()
                .HasForeignKey(f => f.DepartingAirportId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Flight>()
                .HasOne(f => f.DestinationAirport)
                .WithMany()
                .HasForeignKey(f => f.DestinationAirportId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Flight>()
                .HasOne(f => f.Aircraft)
                .WithMany()
                .HasForeignKey(f => f.AircraftId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserTicket>()
                .HasKey(ut => new { ut.UserId, ut.TicketId });

            modelBuilder.Entity<UserTicket>()
                .HasOne(ut => ut.User)
                .WithMany(u => u.TicketList)
                .HasForeignKey(ut => ut.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserTicket>()
                .HasOne(ut => ut.Ticket)
                .WithOne()
                .HasForeignKey<UserTicket>(ut => ut.TicketId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<FlightTicket>()
                .HasKey(ft => new { ft.FlightId, ft.TicketId });

            modelBuilder.Entity<FlightTicket>()
                .HasOne(ft => ft.Flight)
                .WithMany(f => f.PassengerList)
                .HasForeignKey(ft => ft.FlightId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<FlightTicket>()
                .HasOne(ft => ft.Ticket)
                .WithOne()
                .HasForeignKey<FlightTicket>(ft => ft.TicketId)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<Discounts>()
                .HasOne(d => d.Flight)
                .WithMany()
                .HasForeignKey(d => d.FlightId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CheckIn>()
                .HasOne(c => c.Ticket)
                .WithOne()
                .HasForeignKey<CheckIn>(c => c.TicketId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}