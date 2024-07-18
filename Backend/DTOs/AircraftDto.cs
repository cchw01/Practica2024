namespace Backend.DTOs
{
    public class AircraftDto
    {
        public int AircraftId { get; set; }
        public string RegistrationNumber { get; set; }
        public string Maker { get; set; }
        public string Model { get; set; }
        public int NumberOfSeats { get; set; }
        public int AutonomyInHours { get; set; }
        public double MaxCargo { get; set; }
    }

}
