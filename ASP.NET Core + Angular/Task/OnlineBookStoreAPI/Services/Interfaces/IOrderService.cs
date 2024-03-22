using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Models.DTOs;

namespace OnlineBookStoreAPI.Services.Interfaces
{
    public interface IOrderService
    {
        public Task<OrderDto> GetAllOrdersAsync();
        public Task<PagedList<OrderDto?>> GetOrdersAsync(OrderParams orderParams);
        public Task<OrderDto> CreateAsync(OrderDto orderDto);
    }
}
