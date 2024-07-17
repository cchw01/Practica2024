using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AircraftController : ControllerBase
    {
        private readonly AircraftManager aircraftManager;
        public AircraftController()
        {
            aircraftManager = new AircraftManager();
        }

        [HttpGet]
        public IActionResult GetAircrafts()
        {
            return Ok(aircraftManager.GetAllAircrafts());
        }
        [HttpGet]
        [Route("{aircraftId}")]
        public IActionResult GetAircraft(int aircraftId)
        {
            var aircraft = aircraftManager.GetAircraft(aircraftId);
            if (aircraft != null)
            {
                return Ok(aircraft);
            }
            return NotFound($"can't found item with id:{aircraftId}");
        }
        [HttpPost]
        public IActionResult AddNewAircraft(Models.Aircraft item)
        {
            try
            {
                aircraftManager.AddAircraft(item);
                return Created();
            }
            catch
            {
                return BadRequest("The request is not valid");
            }
        }
        [HttpPut]
        public IActionResult UpdateAircraft(Models.Aircraft item)
        {
            try
            {
                aircraftManager.UpdateAircraft(item);
                return Ok();
            }
            catch
            {
                return BadRequest("The request is not valid");
            }
        }
        [HttpDelete]
        [Route("{aircraftId}")]
        public IActionResult RemoveAircraft(int aircraftId)
        {
            try
            {
                aircraftManager.RemoveItem(aircraftId);
                return Ok();
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
