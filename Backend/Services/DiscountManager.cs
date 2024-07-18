using AutoMapper;
using Backend.ApplicationDBContext;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class DiscountManager
    {
        private readonly ApplicationDbContext discountContext = new ApplicationDbContext();
        private readonly IMapper _mapper;

        public DiscountManager()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });
            _mapper = config.CreateMapper();
        }

        public List<DiscountDto> GetDiscounts()
        { 
            var discounts = discountContext.Discounts.ToList();
            return _mapper.Map<List<DiscountDto>>(discounts);
        }

        public DiscountDto GetDiscount(int discountId)
        {
            var discount = discountContext.Discounts.FirstOrDefault(a => a.DiscountId == discountId);
            return _mapper.Map<DiscountDto>(discount);
        }

        public void AddDiscount(DiscountDto item)
        {
            var newItem = _mapper.Map<Discount>(item);
            discountContext.Discounts.Add(newItem);
            discountContext.SaveChanges();
        }

        public void RemoveDiscount(int discountId)
        {
            var item = discountContext.Discounts.FirstOrDefault(x => x.DiscountId == discountId);
            if (item == null) throw new ArgumentException("Item does not exist");

            discountContext.Discounts.Remove(item);
            discountContext.SaveChanges();
        }

        public void UpdateDiscount(DiscountDto item)
        {
            var discount = discountContext.Discounts.FirstOrDefault(x => x.DiscountId == item.DiscountId);
            if (discount == null) throw new ArgumentException("Item does not exist");

            _mapper.Map(item, discount);
            discountContext.SaveChanges();
        }
    }
}