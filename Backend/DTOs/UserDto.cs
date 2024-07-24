namespace Backend.DTOs
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string EmailAddress { get; set; }
        public string? Password { get; set; }
    }

}
