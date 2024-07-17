using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Sockets;

namespace Backend.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int UserId { get; set; }
        
        public string Name { get; set; }
        public string Role { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        [ForeignKey("TicketId")]
        public virtual List<Ticket> TicketList { get; set; }
        
    }
}