using Backend.ApplicationDBContext;

using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class DiscountManager
    {
        private readonly ApplicationDbContext discountContext;

        public DiscountManager()
        {
            discountContext = new ApplicationDbContext();
        }

        public List<Discounts> GetDiscounts()
        {
            return discountContext.Discounts
                .Include(f=> f.Flight)
                .ThenInclude(a => a.DepartingAirport)
                .Include(f=> f.Flight)
                .ThenInclude(a => a.DestinationAirport)
                .Include(f=> f.Flight)
                .ThenInclude(a=>a.Aircraft).ToList();
                
        }

        public Discounts GetDiscount(int discountId)
        {
            return discountContext.Discounts
                 .Include(f => f.Flight)
                .ThenInclude(a => a.DepartingAirport)
                .Include(f => f.Flight)
                .ThenInclude(a => a.DestinationAirport)
                .Include(f => f.Flight)
                .ThenInclude(a => a.Aircraft)
                .FirstOrDefault(x => x.DiscountId == discountId);
        }

        public void AddDiscount(Discounts item)
        {
            item.Flight = null;
            discountContext.Discounts.Add(item);
            discountContext.SaveChanges();
        }

        public void RemoveDiscount(int discountId)
        {
            var item = discountContext.Discounts.FirstOrDefault(x => x.DiscountId == discountId);
            if (item == null) { throw new ArgumentException("Item does not exist"); }
            discountContext.Discounts.Remove(item);
            discountContext.SaveChanges();
        }

        public void UpdateDiscount(Discounts item)
        {
            var oldItem = discountContext.Discounts.FirstOrDefault(x => x.DiscountId == item.DiscountId);
            if (oldItem == null) throw new ArgumentException("Item does not exist");

            oldItem.DiscountName = item.DiscountName;
            oldItem.DiscountDescription = item.DiscountDescription;
            oldItem.FlightId = item.FlightId;
            oldItem.DiscountPercentage = item.DiscountPercentage;
            oldItem.StartDate = item.StartDate;
            oldItem.EndDate = item.EndDate;


            discountContext.Discounts.Update(oldItem);
            discountContext.SaveChanges();
        }
    }
}