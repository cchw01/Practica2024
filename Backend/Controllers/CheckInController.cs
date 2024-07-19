using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckInController : ControllerBase
    {
        private readonly CheckInManager checkinManager;

        public CheckInController()
        {

            checkinManager = new CheckInManager();
        }


        [HttpGet]
        public IActionResult GetCheckIns()
        {
            return Ok(checkinManager.GetCheckIns());

        }

        [HttpGet]
        [Route("{checkinId}")]
        public IActionResult GetTicket(int checkinId)
        {
            var checkin = checkinManager.GetCheckIn(checkinId);
            if (checkin != null)
            {
                return Ok(checkin);
            }
            return NotFound($"can't found item with id:{checkinId}");
            }

        [HttpPost]
        public IActionResult AddNewTicket(CheckInDto item)
        {
            try
            {
                checkinManager.AddCheckIn(item);
                return Created();
            }
            catch
            {
                return BadRequest("The request is not valid");
            }
        }

        [HttpPut]
        public IActionResult UpdateCheckIn(CheckInDto item)
        {
            try
            {
                checkinManager.UpdateCheckIn(item);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch
            {
                return BadRequest("the request is not valid");
            }



        }

        [HttpDelete]
        [Route("{checkinId}")]

        public IActionResult DeleteCheckIn(int checkinId)
        {
            try
            {
                checkinManager.RemoveCheckIn(checkinId);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch
            {
                return BadRequest("the request is not valid");
            }

        }

    }
}
