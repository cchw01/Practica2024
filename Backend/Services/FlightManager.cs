using Backend.Models;
using System.Xml.Serialization;
using Backend.ApplicationDBContext;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Backend.DTOs;
using System.Diagnostics.Metrics;

namespace Backend.Services
{
    public class FlightManager
    {
        private readonly ApplicationDbContext _context = new ApplicationDbContext();
        private readonly IMapper _mapper;

        public FlightManager()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });
            _mapper = config.CreateMapper();
        }
        public List<FlightDto> GetFlights()
        {
            var flights = _context.Flights
                .Include(f => f.Discount).ToList();
            return _mapper.Map<List<FlightDto>>(flights);
        }

        public FlightDto GetFlight(int flightNumber)
        {
            var flight = _context.Flights
                .Include(f => f.Discount)
                .FirstOrDefault(x => x.FlightNumber == flightNumber);
            return _mapper.Map<FlightDto>(flight);
        }

        public void AddFlight(FlightDto flight)
        {
            var newFlight = _mapper.Map<Flight>(flight);
            _context.Flights.Add(newFlight);
            _context.SaveChanges();
        }

        public void RemoveFlight(int flightNumber)
        {
            var flight = _context.Flights.FirstOrDefault(x => x.FlightNumber == flightNumber);
            if (flight == null)
                throw new ArgumentException("Flight does not exist");
            _context.Flights.Remove(flight);
            _context.SaveChanges();
        }

        public void UpdateFlight(FlightDto flight)
        {
            var flightToUpdate = _context.Flights.FirstOrDefault(x => x.FlightNumber == flight.FlightNumber);
            if (flightToUpdate == null)
                throw new ArgumentException("Flight does not exist");
            _mapper.Map(flight, flightToUpdate);
            _context.SaveChanges();
        }
        public List<UserDto> GetPassengersByFlight(int flightNumber)
        {
            var flight = _context.Flights
                .Include(f => f.PassengerList)
                    .ThenInclude(t => t.User)
                .FirstOrDefault(f => f.FlightNumber == flightNumber);

            if (flight == null)
            {
                throw new ArgumentException("Flight does not exist");
            }

            var users = flight.PassengerList.Select(t => t.User).ToList();
            return _mapper.Map<List<UserDto>>(users);
        }
        public List<FlightDto> GetFlightsBySearchCriteria(int departingAirportId, int destinationAirportId, DateTime departureDate)
        {
            var flights = _context.Flights
                .Include(f => f.Discount)
                .Where(f => f.DepartingAirportId == departingAirportId &&
                            f.DestinationAirportId == destinationAirportId &&
                            f.DepartingTime.Date == departureDate.Date)
                .ToList();

            return _mapper.Map<List<FlightDto>>(flights);
        }
    }
}