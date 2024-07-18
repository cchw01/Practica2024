using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Aircraft
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int AircraftId { get; set; }
        public string RegistrationNumber { get; set; }
        public string Maker { get; set; }
        public string Model { get; set; }
        public int NumberOfSeats { get; set; }
        public int AutonomyInHours { get; set; }
        public double MaxCargo { get; set; }
    }
}
