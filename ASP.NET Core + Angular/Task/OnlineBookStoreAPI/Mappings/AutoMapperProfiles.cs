using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;

using OnlineBookStoreAPI.Services.Interfaces;
using OnlineBookStoreAPI.Services;

namespace OnlineBookStoreAPI.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        private readonly IConfiguration config;
        public AutoMapperProfiles()
        {
        }

        public AutoMapperProfiles(IConfiguration config)
        {
            this.config = config;
            var tokenConfig = new TokenService(config);

            CreateMap<RegisterDto, AppUser>().ReverseMap();
            CreateMap<LoginDto, AppUser>().ReverseMap();

            CreateMap<AppUser, UserProfileDto>()
                .ForMember(up => up.PhotoUrl, opt => opt.MapFrom(u => u.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(up => up.Token, opt => opt.MapFrom(u => tokenConfig.CreateToken(u).Result))
                .ForMember(up => up.Cart, opt => opt.MapFrom(u => u.Cart != null ? u.Cart : null));

            CreateMap<UserProfileDto, AppUser>();

            CreateMap<AppUser, UserDashboardStatisticDto>()
                .ForMember(uds => uds.CartItemsCount, opt => opt.MapFrom(u => u.Cart.CartItems.Count))
                .ForMember(uds => uds.OrdersCount, opt => opt.MapFrom(u => u.Orders.Count));


            CreateMap<BookDto, Book>();
            CreateMap<Book, BookDto>()
                .ForMember(bd => bd.PhotoUrl, opt => opt.MapFrom(b => b.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<OrderDto, Order>();
            CreateMap<OrderBook, OrderBookDto>().ReverseMap();
            CreateMap<PhotoDto, Photo>().ReverseMap();


            CreateMap<Cart, CartDto>()
               .ForMember(cd => cd.TotalPrice, opt => opt.MapFrom(c => Convert.ToDouble(c.CartItems.Sum(ci => (ci.Quantity * ci.Book.UnitPrice)))))
               .ForMember(cd => cd.TotalCheckedPrice, opt => opt.MapFrom(c => Convert.ToDouble(c.CartItems.Sum(ci => ci.Checked ? (ci.Quantity * ci.Book.UnitPrice) : 0))));
            CreateMap<CartDto, Cart>();

            CreateMap<CartItem, CartItemDto>()
                .ForMember(cd => cd.TotalPrice, opt => opt.MapFrom(c => Convert.ToDouble(c.Quantity * c.Book.UnitPrice)));
            CreateMap<CartItemDto, CartItem>();



            CreateMap<OrderItem, OrderItemDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();

            CreateMap<NewOrderDto, Order>().ReverseMap();

            CreateMap<CartItem, OrderItem>()
                .ForMember(oi => oi.Id, opt => opt.MapFrom(c => (int?)null))
                .ForMember(oi => oi.OrderBook, opt => opt.MapFrom(ci => ci.Book))
                .ForMember(oi => oi.PhotoUrl, opt => opt.MapFrom(ci => ci.Book.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(oi => oi.UnitPrice, opt => opt.MapFrom(ci => ci.Book.UnitPrice))
                .ForMember(oi => oi.TotalPrice, opt => opt.MapFrom(ci => Convert.ToDouble(ci.Checked ? (ci.Quantity * ci.Book.UnitPrice) : 0)));

            CreateMap<Book, OrderBook>()
                .ForMember(ob => ob.Id, opt => opt.MapFrom(b => (int?)null))
                .ForMember(ob => ob.BookId, opt => opt.MapFrom(b => b.Id));
        }
    }
}
