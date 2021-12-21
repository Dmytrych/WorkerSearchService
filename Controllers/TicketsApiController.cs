using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WorkerSearchApp.Dto.Client;
using WorkerSearchApp.Services;

namespace WorkerSearchApp.Controllers
{
    [EnableCors("AllowAll")]
    [Route("[controller]")]
    public class TicketsApiController : Controller
    {
        private readonly ITicketsService ticketsService;
        
        public TicketsApiController(ITicketsService ticketsService)
        {
            this.ticketsService = ticketsService;
        }
        
        [HttpGet("get/{ticketId}")]
        [Route("get")]
        public IActionResult Get([FromRoute] int ticketId)
        {
            if (ticketId <= 0)
            {
                return BadRequest("Invalid ticket id");
            }

            var result = ticketsService.Get(ticketId);

            return result != null ? Ok(result) : BadRequest("The ticket was not found");
        }

        [HttpGet("get-all/{categoryId}")]
        [Route("get-all")]
        public IActionResult GetNotClosed([FromRoute] int? categoryId)
        {
            return Ok(ticketsService.GetNotClosed(categoryId));
        }
        
        [HttpGet("get-user-tickets/{userId}")]
        [Route("get-user-tickets")]
        public IActionResult GetUserTickets([FromRoute] int userId)
        {
            if (userId <= 0)
            {
                return BadRequest("Invalid user id");
            }
            
            return Ok(ticketsService.GetAll(userId));
        }
        
        [HttpPost]
        [Route("add")]
        public IActionResult Add([FromBody] TicketInfoRequestDto ticket)
        {
            var addedTicket = ticketsService.Add(ticket);

            if (addedTicket == null)
            {
                return BadRequest("Some fields are not valid");
            }

            return Ok(addedTicket);
        }
        
        [HttpPost]
        [Route("close")]
        public IActionResult Close(int ticketId)
        {
            var closedTicket = ticketsService.Close(ticketId);

            if (closedTicket == null)
            {
                return BadRequest("The id does not exist");
            }

            return Ok(closedTicket);
        }
    }
}