namespace Backend.Models
{
    public class Discounts
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int DiscountId { get; set; }
        public string DiscountName { get; set; }
        public string DiscountDescription { get; set;}
        public Flight Flight { get; set; }
        public int DiscountPercentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
