using OnlineBookStoreAPI.Services.Interfaces;
using OnlineBookStoreAPI.Services;
using OnlineBookStoreAPI.Data;
using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Repositories.Interfaces;
using OnlineBookStoreAPI.Repositories;
using OnlineBookStoreAPI.Helpers;

namespace OnlineBookStoreAPI.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {

            services.AddCors();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<IBookRepository, BookRepository>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

            //services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddDbContext<BookStoreDbContext>(options => options.UseSqlServer(config.GetConnectionString("DbConnection")));

            return services;
        }
    }
}
