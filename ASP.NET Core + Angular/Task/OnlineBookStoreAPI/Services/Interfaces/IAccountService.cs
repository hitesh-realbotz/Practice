using OnlineBookStoreAPI.Models.DTOs;

namespace OnlineBookStoreAPI.Services.Interfaces
{
    public interface IAccountService
    {
        public Task<UserProfileDto?> CreateAsync(RegisterDto registerDto);
        public Task<UserProfileDto?> LoginAsync(LoginDto loginDto);
    }
}
