using Backend.ApplicationDBContext;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class TicketManager
    {
        private readonly ApplicationDbContext ticketContext;
        public TicketManager()
        {
            ticketContext = new ApplicationDbContext();
        }
        public List<Ticket> GetTickets()
        {
            return ticketContext.Tickets
                .ToList();
        }
        public Ticket GetTicket(int ticketId)
        {
            return ticketContext.Tickets
                .FirstOrDefault(x => x.TicketId == ticketId);
        }
        public void AddTicket(Ticket item)
        {
            item.Flight = null;
            item.User = null;
            ticketContext.Tickets.Add(item);
            ticketContext.SaveChanges();
        }
        public void RemoveTicket(int ticketId)
        {
            var item = ticketContext.Tickets.FirstOrDefault(x => x.TicketId == ticketId);
            if (item == null) { throw new ArgumentException("item deos not exist"); }
            ticketContext.Tickets.Remove(item);
            ticketContext.SaveChanges();
        }
        public void UpdateTicket(Ticket item)
        {
            var oldItem = ticketContext.Tickets.FirstOrDefault(x => x.TicketId == item.TicketId);
            if (oldItem == null) throw new ArgumentException("item deos not exist");

            oldItem.FlightId = item.FlightId;
            oldItem.UserId = item.UserId;
            oldItem.CheckIn = item.CheckIn;
            oldItem.Luggage = item.Luggage;
            oldItem.Price = item.Price;


            ticketContext.Tickets.Update(oldItem);
            ticketContext.SaveChanges();
        }

    }
}
