﻿using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;

public class TheFlights

{

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int FlightNumber { get; set; }
    public Aeroport DepartingAeroport { get; set; }
    public Aeroport DestinationAeroport { get; set; }
    public DateTime DepartingTime { get; set; }
    public DateTime FlightTime { get; set; }
    public int FlightCost { get; set; }
    public int DiscountOffer { get; set; }
    public User PassagerList { get; set; }


}
