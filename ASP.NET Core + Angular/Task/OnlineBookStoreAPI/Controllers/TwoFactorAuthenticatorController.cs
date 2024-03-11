using AutoMapper;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Services.Interfaces;
using QRCoder;
using System.Text;
using System.Text.Encodings.Web;
using System.Drawing;
using System.IO;
using Google.Authenticator;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace OnlineBookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TwoFactorAuthenticatorController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UrlEncoder _urlEncoder;

        public TwoFactorAuthenticatorController(UserManager<AppUser> userManager, ITokenService tokenService, IMapper mapper, SignInManager<AppUser> signInManager, UrlEncoder urlEncoder)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _signInManager = signInManager;
            _urlEncoder = urlEncoder;
        }

        [HttpPost("2fa-login")]
        //[Authorize]
        public async Task<ActionResult<LoginResponseDto>> TwoFALogin(TwoFALoginDto twoFALoginDto)
        {
            //var ch = HttpContext.User.FindFirstValue(ClaimTypes.Authentication).ToString();
            if (HttpContext.User.FindFirstValue(ClaimTypes.Authentication) == "True")
            {
                var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

                var user = await _userManager.Users
                    //.Include(p => p.Photos)
                    .SingleOrDefaultAsync(x => x.Email == HttpContext.User.FindFirstValue(ClaimTypes.Email));

                if (user == null) return Unauthorized("Invalid Email");

                //var result = await _userManager.CheckPasswordAsync(user, twoFALoginDto.Password);
                //if (!result) return Unauthorized("Invalid Password!");
                //var TwoFactorEnabled = await _userManager.GetTwoFactorEnabledAsync(user);
                //if (!TwoFactorEnabled) return Unauthorized("2FA not enabled!");

                var verificationCode = twoFALoginDto.Code.Replace(" ", string.Empty).Replace("-", string.Empty);

                var isValid = await _userManager.VerifyTwoFactorTokenAsync(user, _userManager.Options.Tokens.AuthenticatorTokenProvider, verificationCode);

                if (isValid)
                {
                    return Ok(new LoginResponseDto
                    {
                        Email = user.Email,
                        Token = await _tokenService.CreateToken(user),
                        Gender = user.Gender,
                        IsTwoFAEnabled =  user.TwoFactorEnabled
                    });
                }
                return Unauthorized("Invalid 2FA Code");

            }
            return Unauthorized("2FA not enabled!");
        }


        [HttpPost("get-qr")]
        public async Task<ActionResult<UserProfileDto>> GenerateQRCode(LoginDto loginDto)
        {
            var user = await _userManager.Users
                //.Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.Email == loginDto.Email);
           
            if (user == null) return Unauthorized("Invalid email");

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result)
            {
                return Unauthorized("Invalid Password!");
            }
            var TwoFactorEnabled = await _userManager.GetTwoFactorEnabledAsync(user);
            if (!TwoFactorEnabled)
            {
                var setTwoFactor = await _userManager.SetTwoFactorEnabledAsync(user, true);
            }
            //var HasAuthenticator = await _userManager.GetAuthenticatorKeyAsync(user) != null;
            //var TwoFactorClientRemembered = await _signInManager.IsTwoFactorClientRememberedAsync(user);

            // Load the authenticator key & QR code URI to display on the form
            var unformattedKey = await _userManager.GetAuthenticatorKeyAsync(user);
            if (string.IsNullOrEmpty(unformattedKey))
            {
                await _userManager.ResetAuthenticatorKeyAsync(user);
                unformattedKey = await _userManager.GetAuthenticatorKeyAsync(user);
            }

            var email = await _userManager.GetEmailAsync(user);

            //var AuthenticatorUri = GenerateQrCodeUri(email, unformattedKey);
            //var qrCodeGenerator = new QRCodeGenerator();
            //var qrCodeData = qrCodeGenerator.CreateQrCode(AuthenticatorUri, QRCodeGenerator.ECCLevel.Q);


            return Ok(new AuthenticatorDetailsVM
            {
                SharedKey = FormatKey(unformattedKey),

                AuthenticatorUri = GenerateQrCodeUri(email, unformattedKey)
            });
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
    }
}
