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
using ZXing.QrCode;
using ZXing.QrCode.Internal;

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

        [HttpPost("get-qr")]
        public async Task<ActionResult<UserDto>> GenerateQRCode(LoginDto loginDto)
        {
            var user = await _userManager.Users
                //.Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);

            if (user == null) return Unauthorized("Invalid username");

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
            var HasAuthenticator = await _userManager.GetAuthenticatorKeyAsync(user) != null;
            var TwoFactorClientRemembered = await _signInManager.IsTwoFactorClientRememberedAsync(user);



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
