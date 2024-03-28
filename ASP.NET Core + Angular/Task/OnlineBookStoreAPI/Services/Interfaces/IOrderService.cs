using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Models.DTOs;

namespace OnlineBookStoreAPI.Services.Interfaces
{
    public interface IOrderService
    {
        public Task<PagedList<OrderDto?>> GetOrdersAsync(OrderParams orderParams);
        public Task<OrderDto?> GetOrderByIdAsync(int id);
        public Task<OrderItemDto?> GetOrderItemAsync(int id, string id2);
        public Task<OrderDto> CreateAsync(NewOrderDto newOrderDto);
    }
}
