using Backend.Models;
using System.Xml.Serialization;
using Backend.ApplicationDBContext;
namespace Backend.Services
{
    public class AirportManager
    {
        private readonly ApplicationDbContext airportContext;
        public AirportManager()
        {
            airportContext = new ApplicationDbContext();
        }
        public List<Airport> GetAirports()
        {
            return airportContext.Airports.ToList();
        }
        public Airport GetAirport(int id)
        {
            return airportContext.Airports.FirstOrDefault(x => x.AirportId == id);
        }
        public void AddAirport(Airport airport)
        {
            airportContext.Airports.Add(airport);
            airportContext.SaveChanges();
        }
        public void RemoveAirport(int id)
        {
            var airport = airportContext.Airports.FirstOrDefault(x => x.AirportId == id);
            if (airport == null)
            {
                throw new ArgumentException("Airport does not exist");
            }
            airportContext.Airports.Remove(airport);
            airportContext.SaveChanges();
        }
        public void UpdateAirport(Airport airport)
        {
            var oldAirport = airportContext.Airports.FirstOrDefault(x => x.AirportId == airport.AirportId);
            if (oldAirport == null)
            {
                throw new ArgumentException("Airport does not exist");
            }
            oldAirport.AirportName = airport.AirportName;
            oldAirport.Location = airport.Location;

            airportContext.Airports.Update(oldAirport);
            airportContext.SaveChanges();
        }

    }
}
