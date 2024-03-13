using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Services.Interfaces;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Text;

namespace OnlineBookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UrlEncoder _urlEncoder;
        private readonly IAccountService accountService;
        private readonly IUserService userService;

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, IMapper mapper, UrlEncoder urlEncoder, IAccountService accountService, IUserService userService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _urlEncoder = urlEncoder;
            this.accountService = accountService;
            this.userService = userService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserProfileDto>> Register(RegisterDto registerDto)
        {
            return await accountService.CreateAsync(registerDto);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserProfileDto>> Login(LoginDto loginDto)
        {
            return await accountService.LoginAsync(loginDto);
        }


        [HttpPost("update")]
        [Authorize]
        public async Task<ActionResult<UserProfileDto>> UpdateProfile(UserProfileUpdateDto userProfileUpdateDto)
        {
            return await userService.UpdateAsync(userProfileUpdateDto);
        }

        [HttpPost("verify")]
        [Authorize]
        public async Task<ActionResult<LoginResponseDto>> Verify(TwoFALoginDto twoFALoginDto)
        {
            if (HttpContext.User.FindFirstValue(ClaimTypes.Authentication) == "True")
            {
                var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

                var user = await _userManager.Users
                    //.Include(p => p.Photos)
                    .SingleOrDefaultAsync(x => x.Email == email);

                if (user == null) return Unauthorized("Invalid Email");

                var verificationCode = twoFALoginDto.Code.Replace(" ", string.Empty).Replace("-", string.Empty);

                var isValid = await _userManager.VerifyTwoFactorTokenAsync(user, _userManager.Options.Tokens.AuthenticatorTokenProvider, verificationCode);

                if (isValid)
                {
                    return Ok(new LoginResponseDto
                    {
                        Email = user.Email,
                        Token = await _tokenService.CreateToken(user),
                        Gender = user.Gender,
                        IsTwoFAEnabled = user.TwoFactorEnabled
                    });
                }
                return Unauthorized("Invalid 2FA Code");

            }
            return Unauthorized("2FA not enabled!");
        }

        [HttpPost("getqr")]
        [Authorize]
        public async Task<ActionResult<UserProfileDto>> GenerateQRCode()
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

            var user = await _userManager.Users
                //.Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.Email == email);

            if (user == null) return Unauthorized("Invalid email");

            var TwoFactorEnabled = await _userManager.GetTwoFactorEnabledAsync(user);
            //if (!TwoFactorEnabled)
            //{
            //    var setTwoFactor = await _userManager.SetTwoFactorEnabledAsync(user, true);
            //}
            //var HasAuthenticator = await _userManager.GetAuthenticatorKeyAsync(user) != null;
            //var TwoFactorClientRemembered = await _signInManager.IsTwoFactorClientRememberedAsync(user);

            // Load the authenticator key & QR code URI to display on the form
            var unformattedKey = await _userManager.GetAuthenticatorKeyAsync(user);
            if (string.IsNullOrEmpty(unformattedKey))
            {
                await _userManager.ResetAuthenticatorKeyAsync(user);
                unformattedKey = await _userManager.GetAuthenticatorKeyAsync(user);
            }

            //var email = await _userManager.GetEmailAsync(user);

            //var AuthenticatorUri = GenerateQrCodeUri(email, unformattedKey);
            //var qrCodeGenerator = new QRCodeGenerator();
            //var qrCodeData = qrCodeGenerator.CreateQrCode(AuthenticatorUri, QRCodeGenerator.ECCLevel.Q);


            return Ok(new AuthenticatorDetailsVM
            {
                SharedKey = FormatKey(unformattedKey),

                AuthenticatorUri = GenerateQrCodeUri(email, unformattedKey)
            });
        }


        [HttpPost("setTwoFA")]
        [Authorize]
        public async Task<ActionResult<UserProfileDto>> SetTwoFA(SetTwoFADto setTwoFADto)
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

            var user = await _userManager.Users
                //.Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.Email == email);

            if (user == null) return Unauthorized("Invalid email");

            var verificationCode = setTwoFADto.Code.Replace(" ", string.Empty).Replace("-", string.Empty);

            var isValid = await _userManager.VerifyTwoFactorTokenAsync(user, _userManager.Options.Tokens.AuthenticatorTokenProvider, verificationCode);
            if (isValid)
            {
                await _userManager.SetTwoFactorEnabledAsync(user, true);
                return Ok(new LoginResponseDto
                {
                    Email = user.Email,
                    Token = await _tokenService.CreateToken(user),
                    Gender = user.Gender,
                    IsTwoFAEnabled = user.TwoFactorEnabled
                });
            }
            return Unauthorized("Enter Valid Code!");
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
                _urlEncoder.Encode("ASP.NET Core Identity"),
                _urlEncoder.Encode(email),
                unformattedKey);
        }

        private async Task<bool> UserExists(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());
        }
    }
}
