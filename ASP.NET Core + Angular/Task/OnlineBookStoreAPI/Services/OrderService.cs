using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Extensions;
using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Repositories.Interfaces;
using OnlineBookStoreAPI.Services.Interfaces;
using System.Security.Claims;

namespace OnlineBookStoreAPI.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork uow;
        private readonly UserManager<AppUser> userManager;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IMapper mapper;

        public OrderService(IUnitOfWork uow, UserManager<AppUser> userManager, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            this.uow = uow;
            this.userManager = userManager;
            this.httpContextAccessor = httpContextAccessor;
            this.mapper = mapper;
        }

        public async Task<OrderDto> CreateAsync(NewOrderDto newOrderDto)
        {
            var email = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var userId = GetUserIdFromToken();
            await uow.BeginTransaction();
            var user = await userManager.Users.SingleOrDefaultAsync(x => x.Email == email.ToLower());
            if (user == null) throw new UnauthorizedAccessException("Re-Login & Try again!");
            var pin = newOrderDto.Pin.Replace(" ", string.Empty).Replace("-", string.Empty);

            var isValid = await userManager.VerifyTwoFactorTokenAsync(user, userManager.Options.Tokens.AuthenticatorTokenProvider, pin);
            //if (!isValid) throw new BadHttpRequestException("Enter Valid Pin!");

            Cart cart = await uow.CartRepository.GetByUserId(user.Id);
            if (cart == null) throw new BadHttpRequestException("Cart is blank!");

            if (cart.GetTotalCheckedPrice() != newOrderDto.TotalPrice) throw new BadHttpRequestException("Try again!");

            var order = mapper.Map<Order>(newOrderDto);
            order.AppUserId = userId;

            foreach (var item in cart.CartItems)
            {
                if (item.Checked)
                {
                    if (item.Book.AvailableQuantity < item.Quantity) throw new BadHttpRequestException($"Available quantity is {item.Book.AvailableQuantity}!");
                    var orderItem = mapper.Map<OrderItem>(item);
                    var availableOrderBooks = await uow.OrderBookRepository.GetOrderBookByBookId(item.BookId);
                    var isAvaialble = false;
                    foreach (var availableOrderBook in availableOrderBooks)
                    {
                        if (availableOrderBook.Title == item.Book.Title &&
                            availableOrderBook.Author == item.Book.Author &&
                            availableOrderBook.ISBN == item.Book.ISBN &&
                            availableOrderBook.Description == item.Book.Description &&
                            availableOrderBook.Author == item.Book.Author
                            )
                        {
                            orderItem.OrderBookId = availableOrderBook.Id;
                            orderItem.OrderBook = null;
                            order.OrderItems.Add(orderItem);
                            isAvaialble = true;
                            break;
                        }
                    }
                    if (!isAvaialble)
                    {
                        order.OrderItems.Add(orderItem);
                    }
                }
            }

            order = await uow.OrderRepository.CreateAsync(order);
            if (order == null) throw new BadHttpRequestException("Problem while order placement!");

            for (int i = cart.CartItems.Count - 1; i >= 0; i--)
            {
                if (cart.CartItems[i].Checked)
                {
                    cart.CartItems[i].Book.AvailableQuantity -= cart.CartItems[i].Quantity;
                    cart.CartItems.RemoveAt(i);
                }
            }
            if (cart.CartItems == null || cart.CartItems.Count == 0) await uow.CartRepository.ClearCartAsync(cart);

            if (await uow.Commit()) return mapper.Map<OrderDto>(order);
            throw new BadHttpRequestException("Problem while order placement!");
        }


        public async Task<OrderDto?> GetOrderByIdAsync(int id)
        {
            var order = await uow.OrderRepository.GetOrderByIdAsync(id, GetUserIdFromToken());
            if (order == null) throw new BadHttpRequestException("Order not found!");

            return mapper.Map<OrderDto>(order);
        }

        public async Task<OrderItemDto?> GetOrderItemAsync(int id, string id2)
        {
            var order = await uow.OrderRepository.GetOrderByIdAsync(id, GetUserIdFromToken());
            if (order == null) throw new BadHttpRequestException($"Order with {id} Id not found!");
            foreach (var orderItem in order.OrderItems)
            {
                if (orderItem.OrderBook.ISBN == id2)
                {
                    return mapper.Map<OrderItemDto>(orderItem);
                }
            }
            throw new BadHttpRequestException($"OrderBook with {id2} ISBN Code against orderId {id} not found!");
        }

        public async Task<PagedList<OrderDto?>> GetOrdersAsync(OrderParams orderParams)
        {
            return await uow.OrderRepository.GetOrdersAsync(orderParams, GetUserIdFromToken());
        }

        private string? GetUserIdFromToken()
        {
            return httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Sid);
        }
    }
}
