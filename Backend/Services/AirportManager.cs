using Backend.Models;
using System.Xml.Serialization;
using Backend.ApplicationDBContext;
using AutoMapper;
using Backend.DTOs;
namespace Backend.Services
{
    public class AirportManager
    {
        private readonly ApplicationDbContext _context = new ApplicationDbContext();
        private readonly IMapper _mapper;
        public AirportManager()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });
            _mapper = config.CreateMapper();
        }
        public List<AirportDto> GetAirports()
        {
            var airports = _context.Airports.ToList();
            return _mapper.Map<List<AirportDto>>(airports);
        }
        public AirportDto GetAirport(int id)
        {
            var airport = _context.Airports.FirstOrDefault(a => a.AirportId == id);
            return _mapper.Map<AirportDto>(airport);
        }
        public void AddAirport(AirportDto airport)
        {
            var newAirport = _mapper.Map<Airport>(airport);
            _context.Airports.Add(newAirport);
            _context.SaveChanges();
        }
        public void RemoveAirport(int id)
        {
            var airport = _context.Airports.FirstOrDefault(x => x.AirportId == id);
            if (airport != null)
            {
                _context.Airports.Remove(airport);
                _context.SaveChanges();
            }
            else
            {
                throw new ArgumentException("Airport does not exist");
            }
        }
        public void UpdateAirport(AirportDto airportDto)
        {
            var airport = _context.Airports.FirstOrDefault(x => x.AirportId == airportDto.AirportId);
            if (airport != null)
            {
                _mapper.Map(airportDto, airport);
                _context.SaveChanges();
            }
            else
            {
                throw new ArgumentException("Airport does not exist");
            }
        }
    }
}
