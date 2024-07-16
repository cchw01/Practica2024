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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Specify the connection string here
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=ApplicationDB;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuring relationships
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

            modelBuilder.Entity<Discounts>()
                .HasOne(d => d.Flight)
                .WithMany()
                .HasForeignKey(d => d.FlightId);

            modelBuilder.Entity<CheckIn>()
                .HasOne(c => c.Ticket)
                .WithOne(t => t.CheckIn)
                .HasForeignKey<CheckIn>(c => c.TicketId);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Flight)
                .WithMany()
                .HasForeignKey(t => t.FlightId);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Passenger)
                .WithMany(u => u.TicketList)
                .HasForeignKey(t => t.PassengerId);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.CheckIn)
                .WithOne(c => c.Ticket)
                .HasForeignKey<Ticket>(t => t.CheckInId);
        }
    }
}