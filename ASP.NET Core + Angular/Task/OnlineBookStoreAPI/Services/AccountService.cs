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
        private readonly IMapper mapper;
        private readonly UrlEncoder urlEncoder;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IConfiguration config;

        public AccountService(UserManager<AppUser> userManager, IMapper mapper, UrlEncoder urlEncoder, IHttpContextAccessor httpContextAccessor, IConfiguration config)
        {
            this.userManager = userManager;
            this.mapper = mapper;
            this.urlEncoder = urlEncoder;
            this.httpContextAccessor = httpContextAccessor;
            this.config = config;
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

        public async Task<UserProfileDto?> LoginAsync(LoginDto loginDto)
        {

            AppUser? user = await GetUser(loginDto.Email);
            if (user == null) throw new UnauthorizedAccessException("Invalid email!");

            var result = await userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result) throw new UnauthorizedAccessException("Invalid Password!");

            return mapper.Map<UserProfileDto>(user);
        }

        //VerifyTwoFactorToken code 
        public async Task<UserProfileDto?> TwoFALoginAsync(TwoFALoginDto twoFALoginDto)
        {
            var user = await GetUser(twoFALoginDto.Email);
            if (user == null) throw new UnauthorizedAccessException("Re-Login & Try again!");

            var verificationCode = twoFALoginDto.Code
                                        .Replace(config["QRCodeSettings:SharedKeySeparator1"], string.Empty)
                                        .Replace(config["QRCodeSettings:SharedKeySeparator2"], string.Empty);

            var isValid = await userManager.VerifyTwoFactorTokenAsync(user, userManager.Options.Tokens.AuthenticatorTokenProvider, verificationCode);
            if (isValid) return mapper.Map<UserProfileDto>(user);

            throw new BadHttpRequestException("Enter Valid Code!");
        }

        //Sets TwoFactorEnabled
        public async Task<UserProfileDto?> SetTwoFAAsync(string code, string email)
        {
            var user = await GetUser(email);
            if (user == null) throw new UnauthorizedAccessException("Re-Login & Try again!");

            var verificationCode = code
                                    .Replace(config["QRCodeSettings:SharedKeySeparator1"], string.Empty)
                                    .Replace(config["QRCodeSettings:SharedKeySeparator2"], string.Empty);

            var isValid = await userManager.VerifyTwoFactorTokenAsync(user, userManager.Options.Tokens.AuthenticatorTokenProvider, verificationCode);
            if (isValid)
            {
                await userManager.SetTwoFactorEnabledAsync(user, true);
                return mapper.Map<UserProfileDto>(user);
            }
            throw new BadHttpRequestException("Enter Valid Code!");
        }

        //Resets TwoFactorAuthenticatorKey & Generates QR data
        public async Task<QRDetailsDto?> ResetTwoFKeyAndGetQRAsync()
        {
            var email = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);

            var user = await userManager.Users.SingleOrDefaultAsync(x => x.Email == email.ToLower());

            if (user == null) throw new UnauthorizedAccessException("Re-Login & Try again!");

            // Load the authenticator key & QR code URI to display on the form
            await userManager.ResetAuthenticatorKeyAsync(user);
            var unformattedKey = await userManager.GetAuthenticatorKeyAsync(user);

            if (!string.IsNullOrEmpty(unformattedKey))
            {
                await userManager.SetTwoFactorEnabledAsync(user, false);
            }
            var list = await userManager.GetValidTwoFactorProvidersAsync(user);

            return new QRDetailsDto
            {
                SharedKey = FormatKey(unformattedKey),
                AuthenticatorUri = GenerateQrCodeUri(email, unformattedKey)
            };
        }

        //Formats AuthenticatorKey
        private string FormatKey(string unformattedKey)
        {
            var result = new StringBuilder();
            int currentPosition = 0;
            int keyGroupLength = Convert.ToInt32(config["QRCodeSettings:SharedKeyGroupLength"]);
            while (currentPosition + keyGroupLength < unformattedKey.Length)
            {
                result.Append(unformattedKey.Substring(currentPosition, keyGroupLength)).Append(config["QRCodeSettings:SharedKeySeparator1"]);
                currentPosition += keyGroupLength;
            }
            if (currentPosition < unformattedKey.Length)
            {
                result.Append(unformattedKey.Substring(currentPosition));
            }
            return result.ToString().ToLowerInvariant();
        }

        //GeneratesQRCodeURI
        private string GenerateQrCodeUri(string email, string unformattedKey)
        {
            const string AuthenticatorUriFormat = "otpauth://totp/{0}:{1}?secret={3}&issuer={0}&digits={2}";
            return string.Format(
            AuthenticatorUriFormat,
                urlEncoder.Encode(config["ProjectName"]),
                urlEncoder.Encode(email),
                urlEncoder.Encode(config["QRCodeSettings:VerificationCodeLength"]),
                unformattedKey
                );
        }

        //Checks User exists
        private async Task<bool> UserExists(string email)
        {
            return await userManager.Users.AnyAsync(x => x.Email == email.ToLower());
        }

        //Gets User
        private async Task<AppUser?> GetUser(string email)
        {
            return await userManager.Users
                 .Include(p => p.Photos)
                 .Include(u => u.Cart).ThenInclude(c => c.CartItems).ThenInclude(ci => ci.Book).ThenInclude(b => b.Photos)
                 .SingleOrDefaultAsync(x => x.Email == email.ToLower());
        }



    }
}
