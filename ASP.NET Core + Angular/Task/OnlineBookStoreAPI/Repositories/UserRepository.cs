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

            return await dbContext.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Email == email);
        }


    }
}
