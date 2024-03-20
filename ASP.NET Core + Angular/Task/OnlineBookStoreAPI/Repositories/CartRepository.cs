using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Data;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Repositories.Interfaces;

namespace OnlineBookStoreAPI.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly BookStoreDbContext dbContext;

        public CartRepository(BookStoreDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<bool> ClearCartAsync(Cart cart)
        {
            dbContext.Carts.Remove(cart);  
            return await dbContext.SaveChangesAsync() > 0;           
        }

        public async Task<Cart> CreateAsync(Cart cart)
        {
            await dbContext.Carts.AddAsync(cart);
            await dbContext.SaveChangesAsync();
            return cart;
        }

        public async Task<Cart> GetByUserId(string userId)
        {
            return await dbContext.Carts.Include(c => c.CartItems).ThenInclude(ci => ci.Book).ThenInclude(cb => cb.Photos).FirstOrDefaultAsync(c => c.AppUserId == userId);
        }
    }
}
