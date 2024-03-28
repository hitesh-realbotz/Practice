using OnlineBookStoreAPI.Models.DTOs;

namespace OnlineBookStoreAPI.Services.Interfaces
{
    public interface ICartService
    {
        public Task<CartDto> AddToCartAsync(CartItemDto cartItemDto);
        public Task<CartDto> DecreaseCartItemQtyAsync(CartItemDto cartItemDto);
        public Task<CartDto> ToggleCheckCartItemAsync(CartItemDto cartItemDto);
        public Task<CartDto?> GetUserCartAsync();
        public Task<bool> ClearCartAsync();
    }
}
