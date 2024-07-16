using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Ticket
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int TicketId { get; set; }
        public int CheckInId { get; set; }
        public int FlightId { get; set; }
        public int PassengerId { get; set; }
        public virtual Flight Flight { get; set; }
        public virtual User Passenger { get; set; }
        public virtual CheckIn CheckIn { get; set; }
        public bool Luggage { get; set; }
        public float Price { get; set; }

    }
}