using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WorkerSearchApp.Dto.Client;
using WorkerSearchApp.Services;

namespace WorkerSearchApp.Controllers
{
    [EnableCors("AllowAll")]
    [Route("[controller]")]
    public class OrdersApiController : Controller
    {
        private readonly IOrdersService ordersService;
        
        public OrdersApiController(IOrdersService ordersService)
        {
            this.ordersService = ordersService;
        }

        [HttpGet]
        [Route("get")]
        public IActionResult Get(int orderId)
        {
            var order = ordersService.Get(orderId);
            return order != null ? Ok(order) : BadRequest("Order not found");
        }

        [HttpGet("get-assigned/{userId}")]
        [Route("get-assigned")]
        public IActionResult GetAssignedOrders([FromRoute] int userId)
            => Ok(ordersService.GetAssignedOrders(userId));

        [HttpGet("get-placed/{userId}")]
        [Route("get-placed")]
        public IActionResult GetPlacedOrders([FromRoute] int userId)
            => Ok(ordersService.GetPlacedOrders(userId));

        [HttpPost]
        [Route("add")]
        public IActionResult Add([FromBody] OrderInfoResponseDto order)
        {
            if (order == null || order.TicketId <= 0 || order.IsClosed || order.OrderedById <= 0)
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
        public IActionResult Close([FromBody] int orderId)
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