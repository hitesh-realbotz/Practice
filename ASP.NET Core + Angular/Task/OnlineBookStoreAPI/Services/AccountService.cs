using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Services.Interfaces;
using System.Text;
using System.Text.Encodings.Web;

namespace OnlineBookStoreAPI.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> userManager;
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;
        private readonly UrlEncoder urlEncoder;

        public AccountService(UserManager<AppUser> userManager, ITokenService tokenService, IMapper mapper, UrlEncoder urlEncoder)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
            this.mapper = mapper;
            this.urlEncoder = urlEncoder;
        }

        public async Task<UserProfileDto?> CreateAsync(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Email)) throw new BadHttpRequestException("Email is Taken");

            var user = mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Email.ToLower();

            var result = await userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                var sb = new StringBuilder();
                foreach (var error in result.Errors)
                {
                    sb.AppendLine($"Code : {error.Code}");
                    sb.AppendLine($"Description : {error.Description}");
                }
                throw new BadHttpRequestException(sb.ToString());
            }
            //var signUpResponse = new SignUpResponseDto
            //{
            //    Email = user.Email,
            //    Token = await tokenService.CreateToken(user),
            //    IsTwoFAEnabled = user.TwoFactorEnabled
            //};
            return mapper.Map<UserProfileDto>(user);
        }

        public async Task<UserProfileDto?> LoginAsync(LoginDto loginDto)
        {
            var user = await userManager.Users
                 .Include(p => p.Photos)
                 .Include(u => u.Cart)
                 .SingleOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) throw new UnauthorizedAccessException("Invalid username");

            var result = await userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result) throw new UnauthorizedAccessException("Invalid Password!");

            return mapper.Map<UserProfileDto>(user);
        }

        private string FormatKey(string unformattedKey)
        {
            var result = new StringBuilder();
            int currentPosition = 0;
            while (currentPosition + 4 < unformattedKey.Length)
            {
                result.Append(unformattedKey.Substring(currentPosition, 4)).Append(" ");
                currentPosition += 4;
            }
            if (currentPosition < unformattedKey.Length)
            {
                result.Append(unformattedKey.Substring(currentPosition));
            }

            return result.ToString().ToLowerInvariant();
        }


        private string GenerateQrCodeUri(string email, string unformattedKey)
        {
            const string AuthenticatorUriFormat = "otpauth://totp/{0}:{1}?secret={2}&issuer={0}&digits=6";

            return string.Format(
            AuthenticatorUriFormat,
                urlEncoder.Encode("ASP.NET Core Identity"),
                urlEncoder.Encode(email),
                unformattedKey);
        }

        private async Task<bool> UserExists(string email)
        {
            return await userManager.Users.AnyAsync(x => x.Email == email.ToLower());
        }
    }
}
