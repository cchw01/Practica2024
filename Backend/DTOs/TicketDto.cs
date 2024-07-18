namespace Backend.DTOs
{
    public class TicketDto
    {
        public int TicketId { get; set; }
        public int FlightId { get; set; }
        public int UserId { get; set; }
        public int? CheckInId { get; set; }
        public bool Luggage { get; set; }
        public float Price { get; set; }
    }

}
