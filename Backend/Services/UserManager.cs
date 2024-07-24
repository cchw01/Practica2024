using AutoMapper;
using Backend.ApplicationDBContext;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Services
{
    public class UserManager
    {
        private readonly ApplicationDbContext _context = new ApplicationDbContext();
        private readonly IMapper _mapper;

        public UserManager()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });
            _mapper = config.CreateMapper();
        }

        public List<UserDto> GetUsers()
        {
            var users = _context.Users.ToList();
            return _mapper.Map<List<UserDto>>(users);
        }

        public UserDto GetUser(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.UserId == id);
            return _mapper.Map<UserDto>(user);
        }

        public List<TicketDto> GetUserTickets(int userId)
        {
            var user = _context.Users.Include(u => u.TicketList)
                                       .ThenInclude(t => t.CheckIn)
                                     .FirstOrDefault(u => u.UserId == userId);
            if (user == null)
                throw new ArgumentException("User does not exist");

            return _mapper.Map<List<TicketDto>>(user.TicketList);
        }


        public void AddUser(UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void RemoveUser(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.UserId == id);
            if (user == null)
                throw new ArgumentException("User doesn't exist.");

            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        public void UpdateUser(UserDto userDto)
        {
            var user = _context.Users.FirstOrDefault(x => x.UserId == userDto.UserId);
            if (user == null)
                throw new ArgumentException("User doesn't exist.");

            if (userDto.Password == null || userDto.Password.IsNullOrEmpty())
                userDto.Password = user.Password;

            _mapper.Map(userDto, user);
            _context.SaveChanges();
        }

        public UserDto Login(LoginDto loginDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.EmailAddress == loginDto.EmailAddress);
            if (user == null)
            {
                throw new ArgumentException("User does not exist");
            }
            if (user.Password != loginDto.Password)
            {
                throw new ArgumentException("Incorrect password");
            }
            return _mapper.Map<UserDto>(user);
        }

        public UserDto Register(UserDto userDto)
        {
            if (_context.Users.Any(u => u.EmailAddress == userDto.EmailAddress))
                throw new ArgumentException("A user with the same email address already exists");

            var user = _mapper.Map<User>(userDto);
            _context.Users.Add(user);
            _context.SaveChanges();
            return _mapper.Map<UserDto>(user);
        }
    }
}
