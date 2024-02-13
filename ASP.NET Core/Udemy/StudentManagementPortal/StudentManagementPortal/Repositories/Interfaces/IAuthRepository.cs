using StudentManagementPortal.Models.Domain;

namespace StudentManagementPortal.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        string GetSalt();
        string GetHashedPassword(string password, string salt);


    }
}
