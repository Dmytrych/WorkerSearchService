using Microsoft.AspNetCore.Mvc;
using WorkerSearchApp.Dto.Client;
using WorkerSearchApp.Services;

namespace WorkerSearchApp.Controllers
{
    [Route("[controller]")]
    public class TicketsApiController : Controller
    {
        private readonly ITicketsService ticketsService;
        
        public TicketsApiController(ITicketsService ticketsService)
        {
            this.ticketsService = ticketsService;
        }
        
        [HttpGet]
        [Route("get")]
        public IActionResult Get(int ticketId)
        {
            if (ticketId <= 0)
            {
                return BadRequest("Invalid ticket id");
            }

            var result = ticketsService.Get(ticketId);

            return result != null ? Ok(result) : BadRequest("The ticket was not found");
        }

        [HttpGet]
        [Route("get-all")]
        public IActionResult GetNotClosed(int categoryId)
        {
            if (categoryId <= 0)
            {
                return BadRequest("Invalid category id");
            }
            
            return Ok(ticketsService.GetNotClosed(categoryId));
        }
        
        [HttpGet]
        [Route("get-user-tickets")]
        public IActionResult GetUserTickets(int userId)
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