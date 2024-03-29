using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineBookStoreAPI.Extensions;
using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Services.Interfaces;

namespace OnlineBookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService orderService;

        public OrderController(IOrderService orderService)
        {
            this.orderService = orderService;
        }


        //Gets PagedList of orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders([FromQuery] OrderParams orderParams)
        {
            var orders = await orderService.GetOrdersAsync(orderParams);

            Response.AddPaginationHeader(new PaginationHeader(orders.CurrentPage, orders.PageSize, orders.TotalCount, orders.TotalPages));
            return Ok(orders);
        } 


        //Gets order by orderId
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrderById([FromRoute] int id)
        {
            var order = await orderService.GetOrderByIdAsync(id);         
            return Ok(order);
        }

        //Gets ordered item by orderId & ordered item's ISBNCode
        [HttpGet("{id}/{id2}")]
        public async Task<ActionResult<OrderItemDto>> GetOrderItemByOrderId([FromRoute] int id, [FromRoute] string id2)
        {
            var order = await orderService.GetOrderItemAsync(id, id2);            
            return Ok(order);
        }


        //Place order
        [HttpPost]
        public async Task<ActionResult<OrderDto>> PlaceOrder(NewOrderDto newOrderDto)
        {
            return await orderService.CreateAsync(newOrderDto);
        }
    }
}
