using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Aircraft
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        private string RegistrationNumber { get; set; }
        private string Maker { get; set; }
        private string Model { get; set; }
        private int NumberOfSeats { get; set; }
        private int AutonomyInHours { get; set; }
        private double MaxCargo { get; set; }
    }
}
