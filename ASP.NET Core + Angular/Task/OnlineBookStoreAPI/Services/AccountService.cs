using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Services.Interfaces;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using static QRCoder.PayloadGenerator;

namespace OnlineBookStoreAPI.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> userManager;
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;
        private readonly UrlEncoder urlEncoder;
        private readonly IHttpContextAccessor httpContextAccessor;

        public AccountService(UserManager<AppUser> userManager, ITokenService tokenService, IMapper mapper, UrlEncoder urlEncoder, IHttpContextAccessor httpContextAccessor)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
            this.mapper = mapper;
            this.urlEncoder = urlEncoder;
            this.httpContextAccessor = httpContextAccessor;
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

            return mapper.Map<UserProfileDto>(user);
        }

        public async Task<QRDetailsDto?> GenerateTwoFAQRCodeAsync()
        {
            var email = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);

            var user = await userManager.Users.SingleOrDefaultAsync(x => x.Email == email.ToLower());

            if (user == null) throw new UnauthorizedAccessException("Re-Login & Try again!");

            // Load the authenticator key & QR code URI to display on the form
            var unformattedKey = await userManager.GetAuthenticatorKeyAsync(user);
            if (string.IsNullOrEmpty(unformattedKey))
            {
                await userManager.ResetAuthenticatorKeyAsync(user);
                unformattedKey = await userManager.GetAuthenticatorKeyAsync(user);
            }

            return new QRDetailsDto
            {
                SharedKey = FormatKey(unformattedKey),
                AuthenticatorUri = GenerateQrCodeUri(email, unformattedKey)
            };
        }

        public async Task<UserProfileDto?> LoginAsync(LoginDto loginDto)
        {

            AppUser? user = await GetUser(loginDto.Email);
            if (user == null) throw new UnauthorizedAccessException("Invalid email!");

            var result = await userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result) throw new UnauthorizedAccessException("Invalid Password!");

            return mapper.Map<UserProfileDto>(user);
        }

        private async Task<AppUser?> GetUser(string email)
        {
            return await userManager.Users
                 .Include(p => p.Photos)
                 .Include(u => u.Cart).ThenInclude(c => c.CartItems).ThenInclude(ci => ci.Book).ThenInclude(b => b.Photos)
                 .SingleOrDefaultAsync(x => x.Email == email.ToLower());
        }

        public async Task<UserProfileDto?> SetTwoFAAsync(string code)
        {
            var email = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await GetUser(email);
            if (user == null) throw new UnauthorizedAccessException("Re-Login & Try again!");

            var verificationCode = code.Replace(" ", string.Empty).Replace("-", string.Empty);

            var isValid = await userManager.VerifyTwoFactorTokenAsync(user, userManager.Options.Tokens.AuthenticatorTokenProvider, verificationCode);
            if (isValid)
            {
                await userManager.SetTwoFactorEnabledAsync(user, true);

                return mapper.Map<UserProfileDto>(user);
            }
            throw new BadHttpRequestException("Enter Valid Code!");
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

        public async Task<UserProfileDto?> TwoFALoginAsync(TwoFALoginDto twoFALoginDto)
        {
            var user = await GetUser(twoFALoginDto.Email);
            if (user == null) throw new UnauthorizedAccessException("Re-Login & Try again!");

            var verificationCode = twoFALoginDto.Code.Replace(" ", string.Empty).Replace("-", string.Empty);

            var isValid = await userManager.VerifyTwoFactorTokenAsync(user, userManager.Options.Tokens.AuthenticatorTokenProvider, verificationCode);
            if (isValid) return mapper.Map<UserProfileDto>(user);

            throw new BadHttpRequestException("Enter Valid Code!");
        }
    }
}
