using AutoMapper;
using Backend.ApplicationDBContext;
using Backend.DTOs;
using Backend.Models;

namespace Backend.Services
{
    public class AircraftManager
    {
        private readonly ApplicationDbContext _context = new ApplicationDbContext();
        private readonly IMapper _mapper;

        public AircraftManager()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });
            _mapper = config.CreateMapper();
        }

        public List<AircraftDto> GetAllAircrafts()
        {
            var aircrafts = _context.Aircrafts.ToList();
            return _mapper.Map<List<AircraftDto>>(aircrafts);
        }

        public AircraftDto GetAircraft(int aircraftId)
        {
            var aircraft = _context.Aircrafts.FirstOrDefault(a => a.AircraftId == aircraftId);
            return _mapper.Map<AircraftDto>(aircraft);
        }

        public void AddAircraft(AircraftDto aircraftDto)
        {
            var aircraft = _mapper.Map<Aircraft>(aircraftDto);
            _context.Aircrafts.Add(aircraft);
            _context.SaveChanges();
        }

        public void UpdateAircraft(AircraftDto aircraftDto)
        {
            var aircraft = _context.Aircrafts.FirstOrDefault(a => a.AircraftId == aircraftDto.AircraftId);
            if (aircraft != null)
            {
                _mapper.Map(aircraftDto, aircraft);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Aircraft not found");
            }
        }

        public void RemoveItem(int aircraftId)
        {
            var aircraft = _context.Aircrafts.FirstOrDefault(a => a.AircraftId == aircraftId);
            if (aircraft != null)
            {
                _context.Aircrafts.Remove(aircraft);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Aircraft not found");
            }
        }
    }

}