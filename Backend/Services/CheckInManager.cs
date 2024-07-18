using Backend.ApplicationDBContext;
using Backend.Models;

namespace Backend.Services
{
    public class CheckInManager
    {
        private readonly ApplicationDbContext checkinContext;

        public CheckInManager() 
        {
        checkinContext = new ApplicationDbContext(); 
        }

        public List<CheckIn> GetCheckIns()
        {
            return checkinContext.CheckIns.ToList();
        }

        public CheckIn GetCheckIn(int checkinId)
        {
            return checkinContext.CheckIns.FirstOrDefault(x => x.CheckInId == checkinId);
        }

        public void AddCheckIn(CheckIn item)
        {
            checkinContext.CheckIns.Add(item);
            checkinContext.SaveChanges();
        }

        public void RemoveCheckIn(int checkinId)
        {
            var item = checkinContext.CheckIns.FirstOrDefault(x => x.CheckInId == checkinId);
            if (item == null) { throw new ArgumentException("item deos not exist"); }
            checkinContext.CheckIns.Remove(item);
            checkinContext.SaveChanges();
        }

        public void UpdateCheckIn(CheckIn item)
        {
            var oldItem = checkinContext.CheckIns.FirstOrDefault(x => x.CheckInId == item.CheckInId);
            if (oldItem == null) throw new ArgumentException("item deos not exist");

            oldItem.Ticket = item.Ticket;
            oldItem.PassengerName = item.PassengerName;
            oldItem.IdDocumentType = item.IdDocumentType;
            oldItem.DocumentData = item.DocumentData;
            oldItem.CheckInStatus = item.CheckInStatus;
            oldItem.PassengerEmail = item.PassengerEmail;



            checkinContext.CheckIns.Update(oldItem);
            checkinContext.SaveChanges();
        }

    }
}
