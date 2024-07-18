using AutoMapper;
using Backend.ApplicationDBContext;
using Backend.DTOs;
using Backend.Models;

namespace Backend.Services
{
    public class CheckInManager
    {
        private readonly ApplicationDbContext checkinContext=new ApplicationDbContext();
        
        private readonly IMapper _mapper;
        public CheckInManager() 
        {
        
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });
            _mapper = config.CreateMapper();
        }

        public List<CheckInDto> GetCheckIns()
        {
            var checkins = checkinContext.CheckIns.ToList();
            return _mapper.Map<List<CheckInDto>>(checkins);
        }

        public CheckInDto GetCheckIn(int checkinId)
        {
            var checkin = checkinContext.CheckIns.FirstOrDefault(x => x.CheckInId == checkinId);
            return _mapper.Map<CheckInDto>(checkin);
        }

        public void AddCheckIn(CheckInDto item)
        {
            var newCheckIn = _mapper.Map<CheckIn>(item);
            checkinContext.CheckIns.Add(newCheckIn);
            checkinContext.SaveChanges();
        }

        public void RemoveCheckIn(int checkinId)
        {
            var checkin = checkinContext.CheckIns.FirstOrDefault(x => x.CheckInId == checkinId);
            if (checkin != null)
            {
                checkinContext.CheckIns.Remove(checkin);
                checkinContext.SaveChanges();
            }
            else
            {
                throw new ArgumentException("CheckIn does not exist");
            }
        }
        

        public void UpdateCheckIn(CheckInDto item)
        { 
            var checkin = checkinContext.CheckIns.FirstOrDefault(x => x.CheckInId == item.CheckInId);
            if (checkin != null)
            {
                _mapper.Map(item, checkin);
                checkinContext.SaveChanges();
            }
            else
            {
                throw new ArgumentException("CheckIn does not exist");
            }
        }

    }
}
