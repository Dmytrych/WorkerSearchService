using Microsoft.AspNetCore.Mvc;
using WorkerSearchApp.Dto;
using WorkerSearchApp.Services;

namespace WorkerSearchApp.Controllers
{
    [Route("[controller]")]
    public class OrdersApiController : Controller
    {
        private readonly IOrdersService ordersService;
        
        public OrdersApiController(IOrdersService ordersService)
        {
            this.ordersService = ordersService;
        }

        [HttpGet]
        [Route("get-assigned")]
        public IActionResult GetAssignedOrders(int userId)
            => Ok(ordersService.GetAssignedOrders(userId));

        [HttpGet]
        [Route("get-placed")]
        public IActionResult GetPlacedOrders(int userId)
            => Ok(ordersService.GetPlacedOrders(userId));

        [HttpPost]
        [Route("add")]
        public IActionResult Add([FromBody] Order order)
        {
            if (order == null || order.TicketId <= 0 || order.Closed || order.OrderedById <= 0)
            {
                return BadRequest("Invalid input");
            }
            
            var addedOrder = ordersService.Add(order);

            if (addedOrder == null)
            {
                return BadRequest("Invalid input");
            }

            return Ok(addedOrder);
        }

        [HttpPost]
        [Route("close")]
        public IActionResult Close(int orderId)
        {
            var closedOrder = ordersService.Close(orderId);

            if (closedOrder == null)
            {
                return BadRequest("Invalid order id");
            }

            return Ok(closedOrder);
        }
    }
}