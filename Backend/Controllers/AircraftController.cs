using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Backend.DTOs;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AircraftController : ControllerBase
    {
        private readonly AircraftManager _aircraftManager;
        public AircraftController()
        {
            _aircraftManager = new AircraftManager();
        }

        [HttpGet]
        public IActionResult GetAircrafts()
        {
            return Ok(_aircraftManager.GetAllAircrafts());
        }

        [HttpGet("{aircraftId}")]
        public IActionResult GetAircraft(int aircraftId)
        {
            var aircraft = _aircraftManager.GetAircraft(aircraftId);
            if (aircraft != null)
            {
                return Ok(aircraft);
            }
            return NotFound($"Aircraft with ID {aircraftId} not found.");
        }

        [HttpPost]
        public IActionResult AddNewAircraft([FromBody] AircraftDto aircraftDto)
        {
            try
            {
                _aircraftManager.AddAircraft(aircraftDto);
                return Created();
            }
            catch
            {
                return BadRequest("The request is not valid");
            }
        }

        [HttpPut]
        public IActionResult UpdateAircraft([FromBody] AircraftDto aircraftDto)
        {
            var existingAircraft = _aircraftManager.GetAircraft(aircraftDto.AircraftId);
            if (existingAircraft == null)
            {
                return NotFound($"Aircraft with ID {aircraftDto.AircraftId} not found.");
            }

            try
            {
                _aircraftManager.UpdateAircraft(aircraftDto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{aircraftId}")]
        public IActionResult RemoveAircraft(int aircraftId)
        {
            try
            {
                _aircraftManager.RemoveItem(aircraftId);
                return Ok(); 
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
