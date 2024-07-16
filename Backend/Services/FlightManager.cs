using Backend.Models;
using System.Xml.Serialization;
using Backend.ApplicationDBContext;

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
            return flightContext.Flights.ToList();
        }

        public Flight GetFlight(int flightNumber)
        {
            return flightContext.Flights.FirstOrDefault(x => x.FlightNumber == flightNumber);
        }

        public void AddFlight(Flight flight)
        {
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

            oldFlight.DepartingAirport = flight.DepartingAirport;
            oldFlight.DestinationAirport = flight.DestinationAirport;
            oldFlight.DepartingTime = flight.DepartingTime;
            oldFlight.FlightTime = flight.FlightTime;
            oldFlight.FlightCost = flight.FlightCost;
            oldFlight.DiscountOffer = flight.DiscountOffer;
            oldFlight.PassengerList = flight.PassengerList;

            flightContext.Flights.Update(oldFlight);
            flightContext.SaveChanges();
        }



    }


}








