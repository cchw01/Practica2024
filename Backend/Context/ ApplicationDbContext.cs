using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.ApplicationDBContext
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Airport> Airports { get; set; }
        public DbSet<Aircraft> Aircrafts { get; set; }
        public DbSet<CheckIn> CheckIns { get; set; }
        public DbSet<Discounts> Discounts { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (!options.IsConfigured)
            {
                options.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=PlaneCompanyDB;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
        }
    }
}