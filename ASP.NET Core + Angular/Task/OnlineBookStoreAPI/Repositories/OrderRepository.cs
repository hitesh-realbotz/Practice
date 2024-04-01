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


        //Creates new order
        public async Task<Order> CreateAsync(Order order)
        {
            await dbContext.Orders.AddAsync(order);
            await dbContext.SaveChangesAsync();
            return order;
        }

        //Gets order by orderId
        public async Task<Order?> GetOrderByIdAsync(int id, string userId)
        {
            return await dbContext.Orders.Where(o => o.AppUserId == userId).Include(o => o.OrderItems).ThenInclude(oi => oi.OrderBook).FirstOrDefaultAsync(o => o.Id == id);
        }


        //Gets PagedList of orders
        public async Task<PagedList<OrderDto?>> GetOrdersAsync(OrderParams orderParams, string userId)
        {
            var query = dbContext.Orders.Where(o => o.AppUserId == userId).Include(o => o.OrderItems).ThenInclude(oi => oi.OrderBook).AsQueryable();
            query = orderParams.SortBy switch
            {
                Const.PRICE => (orderParams.SortOrder == Const.ASCENDING ? query.OrderBy(o => o.TotalPrice) : query.OrderByDescending(o => o.TotalPrice)),
                _ => (orderParams.SortOrder == Const.ASCENDING ? query.OrderBy(o => o.Date) : query.OrderByDescending(o => o.Date)),
            };

            return await PagedList<OrderDto>.CreateAsync(query.ProjectTo<OrderDto>(mapper.ConfigurationProvider), orderParams.PageNumber, orderParams.PageSize);
        }

    }
}
