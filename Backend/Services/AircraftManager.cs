using Backend.ApplicationDBContext;
using Backend.Models;

namespace Backend.Services
{
    public class AircraftManager
    {
        private readonly ApplicationDbContext aircraftContext;
        public AircraftManager()
        {
            aircraftContext = new ApplicationDbContext();
        }

        public List<Aircraft> GetAllAircrafts()
        {
            return aircraftContext.Aircrafts.ToList();
        }
        public Aircraft GetAircraft(string registrationNumber)
        {
            return aircraftContext.Aircrafts.FirstOrDefault(x => x.RegistrationNumber == registrationNumber);
        }

        public void AddAircraft(Aircraft aircraft)
        {
            aircraftContext.Aircrafts.Add(aircraft);
            aircraftContext.SaveChanges();
        }

        public void UpdateAircraft(Aircraft aircraft)
        {
            var existingAircraft = aircraftContext.Aircrafts.FirstOrDefault(x => x.RegistrationNumber == aircraft.RegistrationNumber);
            if(existingAircraft!=null)
            {
                existingAircraft.Maker = aircraft.Maker;
                existingAircraft.Model = aircraft.Model;
                existingAircraft.NumberOfSeats = aircraft.NumberOfSeats;
                existingAircraft.AutonomyInHours = aircraft.AutonomyInHours;
                existingAircraft.MaxCargo = aircraft.MaxCargo;

                aircraftContext.Aircrafts.Update(existingAircraft);
                aircraftContext.SaveChanges();
            }
            else
            {
                throw new Exception("Aircraft not found");
            }
        }

        public void RemoveItem(string registrationNumber)
        {
            var aircraft = aircraftContext.Aircrafts.FirstOrDefault(x => x.RegistrationNumber == registrationNumber);
            if (aircraft == null)
            {
                throw new Exception("Aircraft not found");
            } else
            {
                aircraftContext.Aircrafts.Remove(aircraft);
                aircraftContext.SaveChanges();
            }
        }
    }

}