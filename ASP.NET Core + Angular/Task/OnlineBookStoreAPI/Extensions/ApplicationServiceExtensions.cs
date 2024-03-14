using OnlineBookStoreAPI.Services.Interfaces;
using OnlineBookStoreAPI.Services;
using OnlineBookStoreAPI.Data;
using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Repositories.Interfaces;
using OnlineBookStoreAPI.Repositories;
using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Mappings;
using Microsoft.AspNetCore.Hosting;

namespace OnlineBookStoreAPI.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {

            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();
            services.AddAutoMapper(cfg => cfg.AddProfile(new AutoMapperProfiles(config)), typeof(AutoMapperProfiles));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAccountService, AccountService>();

            services.AddScoped<IBookRepository, BookRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

            //services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddDbContext<BookStoreDbContext>(options => options.UseSqlServer(config.GetConnectionString("DbConnection")));

            return services;
        }
    }
}
