using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Data;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Repositories.Interfaces;

namespace OnlineBookStoreAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly BookStoreDbContext dbContext;

        public UserRepository(BookStoreDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<AppUser?> GetUserByEmailAsync(string email)
        {

            return await dbContext.Users.Include(u => u.Photos).Include(u => u.Cart).FirstOrDefaultAsync(u => u.Email == email);
        }
        public async Task<AppUser?> GetUserCartAndOrdersAsync(string email)
        {

            return await dbContext.Users.Include(u => u.Photos).Include(u => u.Cart).ThenInclude(c => c.CartItems).Include(u => u.Orders).FirstOrDefaultAsync(u => u.Email == email);
        }


    }
}
