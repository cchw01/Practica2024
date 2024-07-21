using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly DiscountManager discountManager;

        public DiscountController()
        {
            discountManager = new DiscountManager();
        }

        [HttpGet]
        public IActionResult GetDiscounts()
        {
            return Ok(discountManager.GetDiscounts());
        }

        [HttpGet]
        [Route("{discountId}")]
        public IActionResult GetDiscount(int discountId)
        {
            var discount = discountManager.GetDiscount(discountId);
            if (discount != null)
            {
                return Ok(discount);
            }
            return NotFound($"can't found item with id:{discountId}");
        }

        [HttpPost]
        public IActionResult AddNewDiscount(DiscountDto item)
        {
            try
            {
                discountManager.AddDiscount(item);
                return Created();
            }
            catch
            {
                return BadRequest("The request is not valid");
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDiscount(int id, [FromBody] DiscountDto item)
        {
            try
            {
                discountManager.UpdateDiscount(item);
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

        [HttpDelete]
        [Route("{discountId}")]
        public IActionResult DeleteDiscount(int discountId)
        {
            try
            {
                discountManager.RemoveDiscount(discountId);
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
