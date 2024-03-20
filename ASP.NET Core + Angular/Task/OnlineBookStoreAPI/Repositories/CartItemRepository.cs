using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Data;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Repositories.Interfaces;

namespace OnlineBookStoreAPI.Repositories
{
    public class CartItemRepository : ICartItemRepository
    {
        private readonly BookStoreDbContext dbContext;

        public CartItemRepository(BookStoreDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<bool> RemoveCartItemAsync(CartItem cartItem)
        {
            dbContext.CartItems.Remove(cartItem);
            return await dbContext.SaveChangesAsync() > 0;
        }
    }
}
