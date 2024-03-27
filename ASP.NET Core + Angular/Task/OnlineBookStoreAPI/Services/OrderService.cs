using AutoMapper;
using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Repositories.Interfaces;
using OnlineBookStoreAPI.Services.Interfaces;

namespace OnlineBookStoreAPI.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public OrderService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<OrderDto> CreateAsync(OrderDto orderDto)
        {
            var order = mapper.Map<Order>(orderDto);
            order = await unitOfWork.OrderRepository.CreateAsync(order);
            return mapper.Map<OrderDto>(order);

        }

        public Task<OrderDto> GetAllOrdersAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<PagedList<OrderDto?>> GetOrdersAsync(OrderParams orderParams)
        {
            return await unitOfWork.OrderRepository.GetOrdersAsync(orderParams);
        }
       
    }
}
