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

        [HttpGet("{id}/tickets")]
        public IActionResult GetUserTickets(int id)
        {
            try
            {
                var tickets = userManager.GetUserTickets(id);
                return Ok(tickets);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
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
        public IActionResult UpdateUser([FromBody] UserDto user)
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

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var user = userManager.Login(loginDto);
                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return StatusCode(500, "An internal error occured");
            }
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        {
            try
            {
                var user = userManager.Register(userDto);
                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return StatusCode(500, "An internal server occured");
            }
        }
    }
}
