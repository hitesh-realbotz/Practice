using OnlineBookStoreAPI.Models.Domain;

namespace OnlineBookStoreAPI.Repositories.Interfaces
{
    public interface ICartRepository
    {
        public Task<Cart> CreateAsync(Cart cart);
        public Task<Cart> GetByUserId(string userId);
        public Task<bool> ClearCartAsync(Cart cart);
    }
}
