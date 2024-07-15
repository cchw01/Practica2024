namespace Backend.Models
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public virtual Flight Flight { get; set; }
        public virtual User Passenger { get; set; }
        public virtual CheckIn CheckIn { get; set; }
        public bool Luggage { get; set; }
        public float Price { get; set; }

    }
}
