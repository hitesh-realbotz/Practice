using OnlineBookStoreAPI.Models.DTOs;

namespace OnlineBookStoreAPI.Services.Interfaces
{
    public interface IUserService
    {
        public Task<UserProfileDto> UpdateAsync(UserProfileUpdateDto updateDto);
    }
}
