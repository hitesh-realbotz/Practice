using OnlineBookStoreAPI.Services.Interfaces;
using OnlineBookStoreAPI.Services;
using OnlineBookStoreAPI.Data;
using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Repositories.Interfaces;
using OnlineBookStoreAPI.Repositories;
using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Mappings;

namespace OnlineBookStoreAPI.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {

            services.AddDbContext<BookStoreDbContext>(options => options.UseSqlServer(config.GetConnectionString("DbConnection")));
            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<ICartService, CartService>();
            services.AddScoped<IOrderService, OrderService>();

            services.AddScoped<IBookRepository, BookRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICartRepository, CartRepository>();
            services.AddScoped<ICartItemRepository, CartItemRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IOrderBookRepository, OrderBookRepository>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddAutoMapper(cfg => cfg.AddProfile(new AutoMapperProfiles(config)), typeof(AutoMapperProfiles));

            //services.AddScoped<IUnitOfWork, UnitOfWork>();

            return services;
        }
    }
}
