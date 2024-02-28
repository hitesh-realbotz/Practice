using DatingApp.Entities;
using DatingApp.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DatingApp.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<AppUser> _userManager;
        private readonly SymmetricSecurityKey key;

        public TokenService(IConfiguration config, UserManager<AppUser> userManager)
        {
            key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            _config = config;
            _userManager = userManager;
        }
        public async Task<string> CreateToken(AppUser user)
        {
            var claims = new List<Claim>()
            {
                 new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
            };

            var roles = await _userManager.GetRolesAsync(user);

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

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

        ////Without ASP.NET Identity
        //private readonly IConfiguration _config;
        //private readonly SymmetricSecurityKey key;

        //public TokenService(IConfiguration config)
        //{
        //    key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        //    _config = config;
        //}
        //public string CreateToken(AppUser user)
        //{
        //    var claims = new List<Claim>()
        //    {
        //         new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
        //        new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
        //    };
        //    var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(claims),
        //        Expires = DateTime.Now.AddDays(7),
        //        SigningCredentials = cred
        //    };

        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var token = tokenHandler.CreateToken(tokenDescriptor);

        //    return tokenHandler.WriteToken(token);
        //}

    }

}
