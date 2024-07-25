using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.ApplicationDBContext
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Aircraft> Aircrafts { get; set; }
        public DbSet<Airport> Airports { get; set; }
        public DbSet<CheckIn> CheckIns { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=AirlineCompanyDB;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Flight relationships
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

            modelBuilder.Entity<Flight>()
                .HasOne(f => f.Discount)
                .WithOne(d => d.Flight)
                .HasForeignKey<Discount>(d => d.FlightId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.User)
                .WithMany(u => u.TicketList)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Flight)
                .WithMany(f => f.PassengerList)
                .HasForeignKey(t => t.FlightId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.CheckIn)
                .WithOne(c => c.Ticket)
                .HasForeignKey<CheckIn>(c => c.TicketId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CheckIn>()
                .HasOne(c => c.Ticket)
                .WithOne(t => t.CheckIn)
                .HasForeignKey<CheckIn>(c => c.TicketId)
                .OnDelete(DeleteBehavior.Cascade);

            // Seeding for Airports
            modelBuilder.Entity<Airport>().HasData(
            new Airport { AirportId = 1, Location = "Bucharest, Romania", AirportName = "OTP" },
            new Airport { AirportId = 2, Location = "Barcelona, Spain", AirportName = "BCN" },
            new Airport { AirportId = 3, Location = "Paris, France", AirportName = "CDG" },
            new Airport { AirportId = 4, Location = "Frankfurt, Germany", AirportName = "FRA" },
            new Airport { AirportId = 5, Location = "London, United Kingdom", AirportName = "LHR" },
            new Airport { AirportId = 6, Location = "Rome, Italy", AirportName = "FCO" },
            new Airport { AirportId = 7, Location = "Amsterdam, Netherlands", AirportName = "AMS" },
            new Airport { AirportId = 8, Location = "Vienna, Austria", AirportName = "VIE" },
            new Airport { AirportId = 9, Location = "Athens, Greece", AirportName = "ATH" },
            new Airport { AirportId = 10, Location = "Warsaw, Poland", AirportName = "WAW" }
        );

            // Seeding for Aircrafts
            modelBuilder.Entity<Aircraft>().HasData(
                new Aircraft { AircraftId = 1, RegistrationNumber = "YR-BGH", Maker = "Boeing", Model = "737-800", NumberOfSeats = 189, AutonomyInHours = 7, MaxCargo = 20700 },
                new Aircraft { AircraftId = 2, RegistrationNumber = "LZ-BHF", Maker = "Airbus", Model = "A320", NumberOfSeats = 160, AutonomyInHours = 7, MaxCargo = 22000 },
                new Aircraft { AircraftId = 3, RegistrationNumber = "EI-GTA", Maker = "Boeing", Model = "737 MAX 8", NumberOfSeats = 200, AutonomyInHours = 7, MaxCargo = 20700 },
                new Aircraft { AircraftId = 4, RegistrationNumber = "D-AVZO", Maker = "Airbus", Model = "A321neo", NumberOfSeats = 236, AutonomyInHours = 7, MaxCargo = 25000 },
                new Aircraft { AircraftId = 5, RegistrationNumber = "G-STBD", Maker = "Boeing", Model = "777-300ER", NumberOfSeats = 396, AutonomyInHours = 14, MaxCargo = 22400 },
                new Aircraft { AircraftId = 6, RegistrationNumber = "F-WXWB", Maker = "Airbus", Model = "A350-900", NumberOfSeats = 325, AutonomyInHours = 15, MaxCargo = 30000 },
                new Aircraft { AircraftId = 7, RegistrationNumber = "SP-LSC", Maker = "Boeing", Model = "787-9", NumberOfSeats = 290, AutonomyInHours = 14, MaxCargo = 28000 },
                new Aircraft { AircraftId = 8, RegistrationNumber = "EI-EDY", Maker = "Airbus", Model = "A330-300", NumberOfSeats = 277, AutonomyInHours = 10, MaxCargo = 33000 },
                new Aircraft { AircraftId = 9, RegistrationNumber = "HZ-AI3", Maker = "Boeing", Model = "747-400", NumberOfSeats = 416, AutonomyInHours = 15, MaxCargo = 34000 },
                new Aircraft { AircraftId = 10, RegistrationNumber = "A6-EDA", Maker = "Airbus", Model = "A380", NumberOfSeats = 516, AutonomyInHours = 16, MaxCargo = 37500 }
            );

            //Seeding for Users 
            //admin password: admin
            //user password: user
            modelBuilder.Entity<User>().HasData(
                new User { UserId = 1, Name = "John Doe", Role = "admin", EmailAddress = "admin@wateryairlines.com", Password = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918" },
                new User { UserId = 2, Name = "Jane Smith", Role = "passenger", EmailAddress = "user@wateryairlines.com", Password = "04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb" }
            );


            //Seeding for Flights
            modelBuilder.Entity<Flight>().HasData(
                new Flight { FlightNumber = 1, DepartingAirportId = 1, DestinationAirportId = 2, AircraftId = 1, DepartingTime = new DateTime(2024, 8, 10, 6, 0, 0), FlightTime = new DateTime(2024, 8, 10, 8, 30, 0), FlightCost = 200 },
                new Flight { FlightNumber = 2, DepartingAirportId = 3, DestinationAirportId = 4, AircraftId = 2, DepartingTime = new DateTime(2024, 10, 15, 9, 0, 0), FlightTime = new DateTime(2024, 10, 15, 10, 15, 0), FlightCost = 100 },
                new Flight { FlightNumber = 3, DepartingAirportId = 5, DestinationAirportId = 6, AircraftId = 3, DepartingTime = new DateTime(2024, 12, 21, 16, 0, 0), FlightTime = new DateTime(2024, 12, 21, 20, 45, 0), FlightCost = 300 },
                new Flight { FlightNumber = 4, DepartingAirportId = 1, DestinationAirportId = 2, AircraftId = 4, DepartingTime = new DateTime(2024, 8, 10, 12, 30, 0), FlightTime = new DateTime(2024, 8, 10, 15, 0, 0), FlightCost = 200 },
                new Flight { FlightNumber = 5, DepartingAirportId = 9, DestinationAirportId = 10, AircraftId = 5, DepartingTime = new DateTime(2025, 3, 5, 13, 45, 0), FlightTime = new DateTime(2025, 3, 5, 17, 15, 0), FlightCost = 250 },
                new Flight { FlightNumber = 6, DepartingAirportId = 2, DestinationAirportId = 1, AircraftId = 6, DepartingTime = new DateTime(2024, 9, 25, 7, 0, 0), FlightTime = new DateTime(2024, 9, 25, 9, 0, 0), FlightCost = 175 },
                new Flight { FlightNumber = 7, DepartingAirportId = 4, DestinationAirportId = 3, AircraftId = 7, DepartingTime = new DateTime(2024, 8, 29, 19, 0, 0), FlightTime = new DateTime(2024, 8, 29, 20, 45, 0), FlightCost = 115 },
                new Flight { FlightNumber = 8, DepartingAirportId = 6, DestinationAirportId = 5, AircraftId = 8, DepartingTime = new DateTime(2024, 11, 16, 20, 30, 0), FlightTime = new DateTime(2024, 11, 17, 1, 45, 0), FlightCost = 320 },
                new Flight { FlightNumber = 9, DepartingAirportId = 8, DestinationAirportId = 7, AircraftId = 9, DepartingTime = new DateTime(2025, 2, 14, 6, 15, 0), FlightTime = new DateTime(2025, 2, 14, 8, 35, 0), FlightCost = 180 },
                new Flight { FlightNumber = 10, DepartingAirportId = 10, DestinationAirportId = 9, AircraftId = 10, DepartingTime = new DateTime(2025, 4, 28, 21, 0, 0), FlightTime = new DateTime(2025, 4, 29, 0, 50, 0), FlightCost = 275 },
                new Flight { FlightNumber = 11, DepartingAirportId = 1, DestinationAirportId = 10, AircraftId = 1, DepartingTime = new DateTime(2024, 9, 28, 8, 30, 0), FlightTime = new DateTime(2024, 9, 28, 10, 45, 0), FlightCost = 160 },
                new Flight { FlightNumber = 12, DepartingAirportId = 2, DestinationAirportId = 9, AircraftId = 2, DepartingTime = new DateTime(2024, 10, 3, 14, 15, 0), FlightTime = new DateTime(2024, 10, 3, 15, 15, 0), FlightCost = 90 },
                new Flight { FlightNumber = 13, DepartingAirportId = 3, DestinationAirportId = 8, AircraftId = 3, DepartingTime = new DateTime(2024, 12, 8, 9, 0, 0), FlightTime = new DateTime(2024, 12, 8, 12, 45, 0), FlightCost = 285 },
                new Flight { FlightNumber = 14, DepartingAirportId = 4, DestinationAirportId = 7, AircraftId = 4, DepartingTime = new DateTime(2025, 1, 22, 16, 45, 0), FlightTime = new DateTime(2025, 1, 22, 19, 20, 0), FlightCost = 210 },
                new Flight { FlightNumber = 15, DepartingAirportId = 5, DestinationAirportId = 6, AircraftId = 5, DepartingTime = new DateTime(2025, 3, 30, 11, 0, 0), FlightTime = new DateTime(2025, 3, 30, 15, 0, 0), FlightCost = 260 },
                new Flight { FlightNumber = 16, DepartingAirportId = 6, DestinationAirportId = 5, AircraftId = 6, DepartingTime = new DateTime(2024, 9, 30, 5, 30, 0), FlightTime = new DateTime(2024, 9, 30, 8, 15, 0), FlightCost = 190 },
                new Flight { FlightNumber = 17, DepartingAirportId = 7, DestinationAirportId = 4, AircraftId = 7, DepartingTime = new DateTime(2024, 11, 12, 10, 0, 0), FlightTime = new DateTime(2024, 11, 12, 11, 30, 0), FlightCost = 120 },
                new Flight { FlightNumber = 18, DepartingAirportId = 8, DestinationAirportId = 3, AircraftId = 8, DepartingTime = new DateTime(2025, 2, 1, 15, 15, 0), FlightTime = new DateTime(2025, 2, 1, 18, 25, 0), FlightCost = 240 },
                new Flight { FlightNumber = 19, DepartingAirportId = 9, DestinationAirportId = 2, AircraftId = 9, DepartingTime = new DateTime(2025, 4, 17, 22, 30, 0), FlightTime = new DateTime(2025, 4, 17, 23, 55, 0), FlightCost = 175 },
                new Flight { FlightNumber = 20, DepartingAirportId = 10, DestinationAirportId = 1, AircraftId = 10, DepartingTime = new DateTime(2025, 5, 12, 18, 0, 0), FlightTime = new DateTime(2025, 5, 12, 21, 0, 0), FlightCost = 290 }
            );

            // Seeding for Discounts
            modelBuilder.Entity<Discount>().HasData(
                new Discount { DiscountId = 1, FlightId = 1, DiscountName = "Summer Sun", DiscountDescription = "Catch the summer rays! Book now and get 20% off!", DiscountPercentage = 20, StartDate = new DateTime(2024, 7, 16), EndDate = new DateTime(2024, 8, 10) },
                new Discount { DiscountId = 2, FlightId = 7, DiscountName = "Summer Festival", DiscountDescription = "Festival season is here! Enjoy 15% off your flight!", DiscountPercentage = 15, StartDate = new DateTime(2025, 6, 8), EndDate = new DateTime(2025, 6, 30) },
                new Discount { DiscountId = 3, FlightId = 8, DiscountName = "Autumn Colors", DiscountDescription = "Enjoy the beauty of autumn with 10% off!", DiscountPercentage = 10, StartDate = new DateTime(2025, 5, 25), EndDate = new DateTime(2025, 6, 15) },
                new Discount { DiscountId = 4, FlightId = 3, DiscountName = "Winter Wonderland", DiscountDescription = "Discover winter magic with 20% off!", DiscountPercentage = 20, StartDate = new DateTime(2024, 12, 14), EndDate = new DateTime(2024, 12, 28) },
                new Discount { DiscountId = 5, FlightId = 4, DiscountName = "New Year New Travels", DiscountDescription = "Ring in the new year with travel! Enjoy 25% off!", DiscountPercentage = 25, StartDate = new DateTime(2025, 1, 3), EndDate = new DateTime(2025, 1, 20) },
                new Discount { DiscountId = 6, FlightId = 5, DiscountName = "Spring Blossom", DiscountDescription = "Celebrate spring with a special 15% off on flights!", DiscountPercentage = 15, StartDate = new DateTime(2025, 2, 26), EndDate = new DateTime(2025, 3, 10) },
                new Discount { DiscountId = 7, FlightId = 6, DiscountName = "Easter Getaway", DiscountDescription = "Hop into savings this Easter with 10% off!", DiscountPercentage = 10, StartDate = new DateTime(2025, 3, 18), EndDate = new DateTime(2025, 4, 4) },
                new Discount { DiscountId = 8, FlightId = 2, DiscountName = "Halloween Escape", DiscountDescription = "Escape the spooky season with 15% off!", DiscountPercentage = 15, StartDate = new DateTime(2024, 10, 8), EndDate = new DateTime(2024, 10, 20) }
            );

            // Seeding for Tickets
            modelBuilder.Entity<Ticket>().HasData(
                new Ticket { TicketId = 1, FlightId = 1, UserId = 2, Price = 135.0f, Luggage = true },
                new Ticket { TicketId = 2, FlightId = 2, UserId = 2, Price = 85.0f, Luggage = false },
                new Ticket { TicketId = 3, FlightId = 3, UserId = 2, Price = 255.0f, Luggage = true },
                new Ticket { TicketId = 4, FlightId = 4, UserId = 2, Price = 150.0f, Luggage = false },
                new Ticket { TicketId = 5, FlightId = 5, UserId = 2, Price = 212.5f, Luggage = true }
            );

            // Seeding for CheckIns
            modelBuilder.Entity<CheckIn>().HasData(
                new CheckIn { CheckInId = 1, TicketId = 2, PassengerName = "Jane Smith", IdDocumentType = IdDocumentType.DriverLicense, DocumentData = "DL12345678", CheckInStatus = true, PassengerEmail = "user@wateryairlines.com" },
                new CheckIn { CheckInId = 2, TicketId = 3, PassengerName = "Jane Smith", IdDocumentType = IdDocumentType.IdentityCard, DocumentData = "IC987654321", CheckInStatus = true, PassengerEmail = "user@wateryairlines.com" },
                new CheckIn { CheckInId = 3, TicketId = 4, PassengerName = "Jane Smith", IdDocumentType = IdDocumentType.Passport, DocumentData = "Passport223344", CheckInStatus = true, PassengerEmail = "user@wateryairlines.com" },
                new CheckIn { CheckInId = 4, TicketId = 5, PassengerName = "Jane Smith", IdDocumentType = IdDocumentType.DriverLicense, DocumentData = "DL22334455", CheckInStatus = true, PassengerEmail = "user@wateryairlines.com" }
            );
        }
    }
}
