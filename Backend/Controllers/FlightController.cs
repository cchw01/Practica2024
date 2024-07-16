using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Services;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private readonly FlightManager flightManager;

        public FlightController()
        {
            flightManager = new FlightManager();
        }

        [HttpGet]
        public IActionResult GetFlightCourses()
        {
            return Ok(flightManager.GetFlights());
        }

        [HttpGet]
        [Route("{flightNumber}")]
        public IActionResult GetFlightCourse(int flightNumber)
        {
            var flight = flightManager.GetFlight(flightNumber);
            if (flight != null)
            {
                return Ok(flight);
            }

            return NotFound($"Can't find flight course with id: {flightNumber}");
        }

        [HttpPost]
        public IActionResult AddNewFlightCourse(Flight flight)
        {
            try
            {
                flightManager.AddFlight(flight);
                return Created();
            }
            catch
            {
                return BadRequest("The request is not valid.");
            }
        }

        [HttpPut]
        public IActionResult UpdateFlightCourse(Flight flight)
        {
            try
            {
                flightManager.UpdateFlight(flight);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch
            {
                return BadRequest("The request is not valid!");
            }
        }

        [HttpDelete]
        [Route("{flightNumber}")]
        public IActionResult DeleteFlightCourse(int flightNumber)
        {
            try
            {
                flightManager.RemoveFlight(flightNumber);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch
            {
                return BadRequest("The request is not valid!");
            }
        }
    }
}
