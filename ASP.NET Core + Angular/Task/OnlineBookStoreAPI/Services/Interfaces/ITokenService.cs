using OnlineBookStoreAPI.Models.Domain;

namespace OnlineBookStoreAPI.Services.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}
