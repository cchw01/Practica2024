using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class FlightTicket
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int FlightTicketId { get; set; }
        public int FlightId { get; set; }
        public int TicketId { get; set; }


        [ForeignKey("FlightId")]
        public virtual Flight Flight { get; set; }
        [ForeignKey("TicketId")]
        public virtual Ticket Ticket { get; set; }
    }
}
