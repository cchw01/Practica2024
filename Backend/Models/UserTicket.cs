using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class UserTicket
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int UserTicketId { get; set; }
        public int TicketId { get; set; }
        public int UserId { get; set; }

        [ForeignKey("TicketId")]
        public virtual Ticket Ticket { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
