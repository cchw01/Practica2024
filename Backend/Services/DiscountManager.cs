using Backend.Context;
using Backend.Models;

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
            return discountContext.Discounts.ToList();
        }

        public Discounts GetDiscount(int discountId)
        {
            return discountContext.Discounts.FirstOrDefault(x => x.DiscountId == discountId);
        }

        public void AddDiscount(Discounts item)
        {
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
            oldItem.Flight = item.Flight;
            oldItem.DiscountPercentage = item.DiscountPercentage;
            oldItem.StartDate = item.StartDate;
            oldItem.EndDate = item.EndDate;


            discountContext.Discounts.Update(oldItem);
            discountContext.SaveChanges();
        }
    }
}