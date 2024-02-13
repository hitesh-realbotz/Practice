using Microsoft.IdentityModel.Tokens;
using StudentManagementPortal.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace StudentManagementPortal.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IConfiguration configuration;

        public AuthRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string GetSalt()
        {
            using (var sha256 = SHA256.Create())
            {
                var saltLength = Convert.ToInt32(configuration["Jwt:SaltLength"]);
                var saltOptions = configuration["Jwt:SaltOptions"];
                var salt = new StringBuilder();
                for (int i = 0; i < saltLength; i++)
                {
                    salt.Append(saltOptions.Substring(new Random().Next(0, 61), 1));
                }
                return salt.ToString();
            }
        }

        public string GetHashedPassword(string password, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                password = password + salt;
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }

    }
}
