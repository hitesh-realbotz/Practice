using OnlineBookStoreAPI.Models.DTOs;

namespace OnlineBookStoreAPI.Services.Interfaces
{
    public interface IAccountService
    {
        public Task<UserProfileDto?> CreateAsync(RegisterDto registerDto);
        public Task<UserProfileDto?> LoginAsync(LoginDto loginDto);
        public Task<UserProfileDto?> TwoFALoginAsync(TwoFALoginDto twoFALoginDto);
        public Task<QRDetailsDto?> ResetTwoFKeyAndGetQRAsync();
        public Task<UserProfileDto?> SetTwoFAAsync(string code, string email);
    }
}
