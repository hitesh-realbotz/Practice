using OnlineBookStoreAPI.Models.Domain;

namespace OnlineBookStoreAPI.Repositories.Interfaces
{
    public interface ICartItemRepository
    {
        public Task<bool> RemoveCartItemAsync(CartItem cartItem);
    }
}
