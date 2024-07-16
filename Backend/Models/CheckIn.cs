using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;
using Backend.Models;


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
        public Ticket Ticket { get; set; }
        public string PassengerName { get; set; }
        public IdDocumentType IdDocumentType { get; set; }
        public string DocumentData { get; set; }
        public bool CheckInStatus { get; set; }
        public string PassengerEmail { get; set; }

    }
}
