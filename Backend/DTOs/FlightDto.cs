namespace Backend.DTOs
{
    public class FlightDto
    {
        public int FlightNumber { get; set; }
        public int DepartingAirportId { get; set; }
        public int DestinationAirportId { get; set; }
        public int AircraftId { get; set; }
        public DateTime DepartingTime { get; set; }
        public DateTime FlightTime { get; set; }
        public int FlightCost { get; set; }
        public int? DiscountId { get; set; }
    }

}
