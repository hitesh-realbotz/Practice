using OnlineBookStoreAPI.Models.DTOs;

namespace OnlineBookStoreAPI.Services.Interfaces
{
    public interface IUserService
    {
        public Task<UserProfileDto> UpdateAsync(UserProfileUpdateDto updateDto);
        public Task<UserProfileDto> AddPhotoAsync(IFormFile file);
        public Task<UserProfileDto> SetMainPhotoAsync(string publicId);
        public Task<UserProfileDto> DeletePhotoAsync(string publicId);
        public Task<UserProfileDto> GetUserAsync(string email);
    }
}
