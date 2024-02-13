using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;

namespace StudentManagementPortal.Services.Interfaces
{
    public interface IAuthService
    {
        string GetSalt();
        string GetHashedPassword(string password, string salt);

        string CreateJWTToken(User user);

        bool VerifyHashedPassword(string password, string userHashedPass, string salt);
        Task<string?> AuthenticateUserAsync(LoginRequestDto loginRequestDto);
    }
}
