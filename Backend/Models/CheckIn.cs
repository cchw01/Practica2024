using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public enum IdDocumentType
    {
        IdentityCard,
        Passport,
        DriverLicense
    }
    public class CheckIn
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int CheckInId { get; set; }
        public int TicketId { get; set; }
        [ForeignKey("TicketId")]
        public virtual Ticket Ticket { get; set; }
        public string PassengerName { get; set; }
        public IdDocumentType IdDocumentType { get; set; }
        public string DocumentData { get; set; }
        public bool CheckInStatus { get; set; }
        public string PassengerEmail { get; set; }

    }
}
