using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OnlineBookStoreAPI.Services
{
    public class TokenService : ITokenService
    {

        private readonly SymmetricSecurityKey key;

        public TokenService(IConfiguration config)
        {
            key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
        public async Task<string> CreateToken(AppUser user)
        {
            var claims = new List<Claim>()
            {
                 new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Authentication, user.TwoFactorEnabled ? "True" : "False")
        };


        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = cred
        };
            
        var tokenHandler = new JwtSecurityTokenHandler();
            
        var token = tokenHandler.CreateToken(tokenDescriptor);
            

            return tokenHandler.WriteToken(token);
        }
}
}
