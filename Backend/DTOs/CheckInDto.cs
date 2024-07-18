using Backend.Models;

namespace Backend.DTOs
{
    public class CheckInDto
    {
        public int CheckInId { get; set; }
        public int TicketId { get; set; }
        public string PassengerName { get; set; }
        public IdDocumentType IdDocumentType { get; set; }
        public string DocumentData { get; set; }
        public bool CheckInStatus { get; set; }
        public string PassengerEmail { get; set; }
    }

}
