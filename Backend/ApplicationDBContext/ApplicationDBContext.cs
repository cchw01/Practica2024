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
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=AirlineCompanyDB;Trusted_Connection=True;");
        }
        /*protected override void OnModelCreating(ModelBuilder modelBuilder)
{
  
   

    // Ticket and Flight (Many-to-One)
    modelBuilder.Entity<Ticket>()
        .HasOne(t => t.Flight)
        .WithMany(f => f.PassengerList)
        .HasForeignKey(t => t.FlightId);

    // Ticket and User (Many-to-One)
    modelBuilder.Entity<Ticket>()
        .HasOne(t => t.Passenger)
        .WithMany(u => u.TicketList)
        .HasForeignKey(t => t.PassengerId);

    // CheckIn and Ticket (One-to-One)
    modelBuilder.Entity<CheckIn>()
        .HasOne(c => c.Ticket)
        .WithOne(t => t.CheckIn)
        .HasForeignKey<CheckIn>(c => c.TicketId);

    // Discounts and Flight (Many-to-One or One-to-One)
    // This setup assumes each discount can apply to only one flight
    modelBuilder.Entity<Discounts>()
        .HasOne(d => d.Flight)
        .WithMany() // If a flight can have multiple discounts, use WithMany() here
        .HasForeignKey(d => d.FlightId);

    // User and Flight (Many-to-Many) via Tickets
    modelBuilder.Entity<User>()
        .HasMany(u => u.TicketList)
        .WithOne(t => t.Passenger)
        .HasForeignKey(t => t.PassengerId);

    // Setting up a join table for User and Flight indirectly through Tickets
    modelBuilder.Entity<Flight>()
        .HasMany(f => f.PassengerList)
        .WithMany(u => u.TicketList)
        .UsingEntity<Ticket>(
            j => j.HasOne(t => t.Passenger).WithMany(u => u.TicketList),
            j => j.HasOne(t => t.Flight).WithMany(f => f.PassengerList)
        );
}*/
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            // Configuring relationships

            /*-------------------------------------*/

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

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Passenger)
                .WithMany()
                .HasForeignKey(t => t.PassengerId);

         
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Flight)
                .WithMany()
                .HasForeignKey(t => t.FlightId);

            modelBuilder.Entity<Discounts>()
                .HasOne(d => d.Flight)
                .WithMany()
                .HasForeignKey(d => d.FlightId);

            modelBuilder.Entity<CheckIn>()
                .HasOne(c => c.Ticket)
                .WithOne()
                .HasForeignKey<CheckIn>(c => c.TicketId);


            /*-------------------------------------*/

            modelBuilder.Entity<User>()
           .HasMany(u => u.TicketList)
           .WithOne(t => t.Passenger)
           .HasForeignKey(t => t.PassengerId)
           .OnDelete(DeleteBehavior.Cascade);






        }
    }
}