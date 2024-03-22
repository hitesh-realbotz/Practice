using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Constants;
using OnlineBookStoreAPI.Data;
using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Repositories.Interfaces;

namespace OnlineBookStoreAPI.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly BookStoreDbContext dbContext;
        private readonly IMapper mapper;

        public OrderRepository(BookStoreDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<Order> CreateAsync(Order order)
        {
            await dbContext.Orders.AddAsync(order);
            await dbContext.SaveChangesAsync();
            return order;
        }

        public async Task<PagedList<OrderDto?>> GetOrdersAsync(OrderParams orderParams)
        {
            var query = dbContext.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.OrderBook).ThenInclude(b => b.Photos).AsQueryable();

            return await PagedList<OrderDto>.CreateAsync(query.ProjectTo<OrderDto>(mapper.ConfigurationProvider), orderParams.PageNumber, orderParams.PageSize);
        }

    }
}
