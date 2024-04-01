using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Services.Interfaces;
using System.Security.Claims;


namespace OnlineBookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountService;
        private readonly UserManager<AppUser> userManager;

        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
            this.userManager = userManager;
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

        //VerifyTwoFactorToken code based login
        [HttpPost("two-fa-login")]
        public async Task<ActionResult<UserProfileDto>> Verify(TwoFALoginDto twoFALoginDto)
        {
            return await accountService.TwoFALoginAsync(twoFALoginDto);
        }

        //Resets TwoFactorAuthenticatorKey & Generates QR data
        [HttpPost("getqr")]
        [Authorize]
        public async Task<ActionResult<QRDetailsDto>> GenerateQRCode()
        {
            return await accountService.ResetTwoFKeyAndGetQRAsync();
        }

        //Sets TwoFactorEnabled
        [HttpPost("setTwoFA")]
        public async Task<ActionResult<UserProfileDto>> SetTwoFA(TwoFALoginDto twoFALoginDto)
        {
            return await accountService.SetTwoFAAsync(twoFALoginDto.Code, twoFALoginDto.Email);
        }

        //Sets TwoFactorEnabled
        [HttpPost("resetTwoFA")]
        [Authorize]
        public async Task<ActionResult<UserProfileDto>> SetTwoFA([FromQuery] string code)
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            return await accountService.SetTwoFAAsync(code, email);
        }
    }
}
