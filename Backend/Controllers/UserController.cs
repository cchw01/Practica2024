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

        public UserController(UserManager userManager)
        {
            this.userManager = userManager;
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
        public IActionResult AddUser(User user)
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
        public IActionResult UpdateUser(User user)
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
    }
}
