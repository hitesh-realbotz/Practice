using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineBookStoreAPI.Extensions;
using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Services;
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

        //[HttpGet]
        //public async Task<ActionResult<OrderDto>> GetAllOrders()
        //{
        //    return await orderService.GetAllOrdersAsync();
        //}

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders([FromQuery] OrderParams orderParams)
        {
            var orders = await orderService.GetOrdersAsync(orderParams);

            Response.AddPaginationHeader(new PaginationHeader(orders.CurrentPage, orders.PageSize, orders.TotalCount, orders.TotalPages));
            return Ok(orders);
        }
        [HttpPost]
        public async Task<ActionResult<OrderDto>> PlaceOrder(OrderDto orderDto)
        {
            return await orderService.CreateAsync(orderDto);
        }
    }
}
