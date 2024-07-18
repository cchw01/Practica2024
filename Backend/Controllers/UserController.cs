using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager userManager;

        public UserController()
        {
            userManager = new UserManager();
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(userManager.GetUsers());
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = userManager.GetUser(id);
            if (user != null)
                return Ok(user);
            return NotFound($"User with id " + id + " was not found.");
        }

        [HttpPost]
        public IActionResult AddUser(UserDto user)
        {
            try
            {
                userManager.AddUser(user);
                return Created();
            }
            catch
            {
                return BadRequest($"An error occured. The user was not added.");
            }
        }

        [HttpPut]
        public IActionResult UpdateUser(UserDto user)
        {
            try
            {
                userManager.UpdateUser(user);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch
            {
                return BadRequest($"The request is not valid.");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                userManager.RemoveUser(id);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch
            {
                return BadRequest($"The request is not valid.");
            }
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();
            var user = userManager
                .GetUsers()
                .FirstOrDefault(
                    (x) => x.EmailAddress == userObj.EmailAddress && x.Password == userObj.Password
                );
            if (user == null)
                return NotFound(new { Message = "User not found" });
            return Ok(new { Message = "Login success!" });
        }

        [HttpPost("register")]
        public IActionResult RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();
            userManager.AddUser(userObj);
            return Ok(new { Message = "User Added!" });
        }
    }
}
