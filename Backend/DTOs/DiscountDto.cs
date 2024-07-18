namespace Backend.DTOs
{
    public class DiscountDto
    {
        public int DiscountId { get; set; }
        public string DiscountName { get; set; }
        public string DiscountDescription { get; set; }
        public int FlightId { get; set; }
        public int DiscountPercentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

}
