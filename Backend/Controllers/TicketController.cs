
using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TicketController : ControllerBase
	{

		private readonly TicketManager ticketManager;
		public TicketController()
		{
			ticketManager = new TicketManager();
		}
		[HttpGet]
		public IActionResult GetTickets()
		{
			return Ok(ticketManager.GetTickets());
		}
		[HttpGet]
		[Route("{ticketId}")]
		public IActionResult GetTicket(int ticketId)
		{
			var ticket = ticketManager.GetTicket(ticketId);
			if (ticket != null)
			{
				return Ok(ticket);
			}
			return NotFound($"can't found item with id:{ticketId}");
		}
		[HttpPost]
		public IActionResult AddNewTicket(TicketDto item)
		{
			try
			{
				ticketManager.AddTicket(item);
				return Created();
			}
			catch
			{
				return BadRequest("The request is not valid");
			}
		}
		[HttpPut]
		public IActionResult UpdateTicket(TicketDto item)
		{
			try
			{
				ticketManager.UpdateTicket(item);
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
		[Route("{ticketId}")]

		public IActionResult DeleteTicket(int ticketId)
		{
			try
			{
				ticketManager.RemoveTicket(ticketId);
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