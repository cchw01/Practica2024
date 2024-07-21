using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.DTOs;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirportController : ControllerBase
    {
        private readonly AirportManager airportItemManager;

        public AirportController()
        {
            airportItemManager = new AirportManager();
        }

        [HttpGet]
        public IActionResult GetAirpotItems()
        {
            return Ok(airportItemManager.GetAirports());
        }

        [HttpGet("{id}")]
        public IActionResult GetAirport(int id)
        {
            var airportItem = airportItemManager.GetAirport(id);
            if (airportItem != null)
            {
                return Ok(airportItem);

            }
            return NotFound($"can't found airport with id: {id}");
        }

        [HttpPost]
        public IActionResult AddNewAirport(AirportDto airport)
        {
            try
            {
                airportItemManager.AddAirport(airport);
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest("The request is not valid");

            }

        }

        [HttpPut]
        public IActionResult PutAirport(AirportDto airport)
        {
            try
            {
                airportItemManager.UpdateAirport(airport);
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return BadRequest("The request is not valid");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAirport(int id)
        {
            try
            {
                airportItemManager.RemoveAirport(id);
                return Ok();

            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch
            {
                return BadRequest("The request is not valid");
            }
        }


    }
}
