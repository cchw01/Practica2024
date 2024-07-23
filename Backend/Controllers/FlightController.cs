using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.DTOs;

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
        [HttpGet("{flightNumber}/passengers")]
        public ActionResult<List<UserDto>> GetPassengers(int flightNumber)
        {
            try
            {
                var passengers = flightManager.GetPassengersByFlight(flightNumber);
                return Ok(passengers);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpPost]
        public IActionResult AddNewFlightCourse(FlightDto flight)
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
        public IActionResult UpdateFlightCourse(FlightDto flight)
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
        [HttpGet("{departingAirportId}/{destinationAirportId}/{departureDate}")]
        public IActionResult SearchFlights(int departingAirportId,int destinationAirportId,DateTime departureDate)
        {
            try
            {
                var flights = flightManager.GetFlightsBySearchCriteria(departingAirportId, destinationAirportId, departureDate);
                return Ok(flights);
            }
            catch
            {
                return BadRequest("The request is not valid.");
            }
        }
    }
}
