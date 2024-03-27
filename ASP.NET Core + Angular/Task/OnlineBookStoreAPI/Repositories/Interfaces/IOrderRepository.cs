using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;

namespace OnlineBookStoreAPI.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        public Task<PagedList<OrderDto?>> GetOrdersAsync(OrderParams orderParams, string userId);
        public Task<Order?> GetOrderByIdAsync(int id, string userId);
        public Task<Order> CreateAsync(Order order);
    }
}
