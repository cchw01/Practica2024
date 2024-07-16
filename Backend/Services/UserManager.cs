using Backend.ApplicationDBContext;
using Backend.Models;

namespace Backend.Services
{
    public class UserManager
    {
        private readonly ApplicationDbContext applicationDBContext;

        // Constructor to initialize context later
        public UserManager()
        {
            applicationDBContext = new ApplicationDbContext();
        }

        // Get all users
        public List<User> GetUsers()
        {
            return applicationDBContext.Users.ToList();
        }

        // Get user by id
        public User GetUser(int id)
        {
            return applicationDBContext.Users.FirstOrDefault(x => x.UserId == id);
        }

        // Add user

        public void AddUser(User user)
        {
            applicationDBContext.Users.Add(user);
            applicationDBContext.SaveChanges();
        }

        // Remove user
        public void RemoveUser(int id)
        {
            var user = applicationDBContext.Users.FirstOrDefault(x => x.UserId == id);
            if (user == null)
                throw new ArgumentException("User doesn't exist.");

            applicationDBContext.Remove(user);
            applicationDBContext.SaveChanges();
        }

        // Update user
        public void UpdateUser(User user)
        {
            var oldUser = applicationDBContext.Users.FirstOrDefault(x => x.UserId == user.UserId);
            if (oldUser == null)
                throw new ArgumentException("User doesn't exist");

            oldUser.Name = user.Name;
            oldUser.EmailAddress = user.EmailAddress;
            oldUser.Password = user.Password;
            oldUser.Role = user.Role;
            oldUser.TicketList = user.TicketList;

            applicationDBContext.Users.Update(oldUser);
            applicationDBContext.SaveChanges();
        }
    }
}
