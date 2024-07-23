using AutoMapper;
using Backend.ApplicationDBContext;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class TicketManager
    {
        private readonly ApplicationDbContext _context = new ApplicationDbContext();
        private readonly IMapper _mapper;
        public TicketManager()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });
            _mapper = config.CreateMapper();
        }
        public List<TicketDto> GetTickets()
        {
            var tickets = _context.Tickets
                .Include(t => t.CheckIn).ToList();
            return _mapper.Map<List<TicketDto>>(tickets);
        }
        public TicketDto GetTicket(int ticketId)
        {
            var ticket = _context.Tickets
                .Include(t => t.CheckIn)
                .FirstOrDefault(x => x.TicketId == ticketId);
            return _mapper.Map<TicketDto>(ticket);
        }
        public void AddTicket(TicketDto item)
        {
            var ticket = _mapper.Map<Ticket>(item);
            _context.Tickets.Add(ticket);
            _context.SaveChanges();
        }
        public void RemoveTicket(int ticketId)
        {
            var item = _context.Tickets.FirstOrDefault(x => x.TicketId == ticketId);
            if (item == null) { throw new ArgumentException("item deos not exist"); }
            _context.Tickets.Remove(item);
            _context.SaveChanges();
        }
        public void UpdateTicket(TicketDto item)
        {
            var ticket = _context.Tickets.FirstOrDefault(x => x.TicketId == item.TicketId);
            if (ticket == null) { throw new ArgumentException("item deos not exist"); }
            _mapper.Map(item, ticket);
            _context.SaveChanges();
        }
    }
}
