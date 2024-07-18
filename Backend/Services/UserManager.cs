﻿using AutoMapper;
using Backend.ApplicationDBContext;
using Backend.DTOs;
using Backend.Models;

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

            _mapper.Map(userDto, user);
            _context.SaveChanges();
        }
    }
}
