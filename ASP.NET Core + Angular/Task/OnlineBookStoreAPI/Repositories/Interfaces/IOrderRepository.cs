using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;

namespace OnlineBookStoreAPI.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        public Task<PagedList<OrderDto?>> GetOrdersAsync(OrderParams orderParams);
        public Task<Order> CreateAsync(Order order);
    }
}
