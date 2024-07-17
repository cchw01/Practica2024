using Backend.Models;
using System.Xml.Serialization;
using Backend.ApplicationDBContext;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class FlightManager
    {
        private readonly ApplicationDbContext flightContext;

        public FlightManager()
        {
            flightContext = new ApplicationDbContext();
        }
        public List<Flight> GetFlights()
        {
            return flightContext.Flights
                .Include(f => f.DepartingAirport)
                .Include(f => f.DestinationAirport)
                .Include(f => f.Aircraft)
                .ToList();
        }

        public Flight GetFlight(int flightNumber)
        {
            return flightContext.Flights
                .Include(f => f.DepartingAirport)
                .Include(f => f.DestinationAirport)
                .Include(f => f.Aircraft)
                .FirstOrDefault(x => x.FlightNumber == flightNumber);
        }

        public void AddFlight(Flight flight)
        {
            flight.DepartingAirport = null;
            flight.DestinationAirport = null;
            flight.Aircraft = null;

            flightContext.Flights.Add(flight);
            flightContext.SaveChanges();
        }

        public void RemoveFlight(int flightNumber)
        {
            var flight = flightContext.Flights.FirstOrDefault(x => x.FlightNumber == flightNumber);
            if (flight == null)
                throw new ArgumentException("Flight does not exist");
            flightContext.Flights.Remove(flight);
            flightContext.SaveChanges();
        }

        public void UpdateFlight(Flight flight)
        {
            var oldFlight = flightContext.Flights.FirstOrDefault(x => x.FlightNumber == flight.FlightNumber);
            if (oldFlight == null)
                throw new ArgumentException("Flight does not exist");

            oldFlight.DepartingAirportId = flight.DepartingAirportId;
            oldFlight.DestinationAirportId = flight.DestinationAirportId;
            oldFlight.AircraftId = flight.AircraftId;
            oldFlight.DepartingTime = flight.DepartingTime;
            oldFlight.FlightTime = flight.FlightTime;
            oldFlight.FlightCost = flight.FlightCost;

            flightContext.Flights.Update(oldFlight);
            flightContext.SaveChanges();
        }


    }


}