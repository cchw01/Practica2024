﻿using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;
using Backend.Models;

public class Flight

{

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int FlightNumber { get; set; }
    public int DepartingAirportId { get; set; }
    public int DestinationAirportId { get; set; }
    [ForeignKey("DepartingAirportId")]
    public virtual Airport DepartingAirport { get; set; }
    [ForeignKey("DestinationAirportId")]
    public virtual Airport DestinationAirport { get; set; }
    public DateTime DepartingTime { get; set; }
    public DateTime FlightTime { get; set; }
    public int FlightCost { get; set; }
    public int DiscountOffer { get; set; }
    public virtual List<User> PassengerList { get; set; }


}
