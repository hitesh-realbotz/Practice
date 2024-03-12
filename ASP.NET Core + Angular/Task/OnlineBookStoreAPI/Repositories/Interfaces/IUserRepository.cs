using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;

namespace OnlineBookStoreAPI.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<AppUser?> GetUserByEmailAsync(string email);
    }
}
