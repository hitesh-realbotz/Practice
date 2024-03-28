using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Services.Interfaces;


namespace OnlineBookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountService;

        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
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

        [HttpPost("two-fa-login")]
        public async Task<ActionResult<UserProfileDto>> Verify(TwoFALoginDto twoFALoginDto)
        {
            return await accountService.TwoFALoginAsync(twoFALoginDto);
        }

        [HttpPost("getqr")]
        [Authorize]
        public async Task<ActionResult<QRDetailsDto>> GenerateQRCode()
        {
            return await accountService.GenerateTwoFAQRCodeAsync();
        }


        [HttpPost("setTwoFA")]
        [Authorize]
        public async Task<ActionResult<UserProfileDto>> SetTwoFA([FromQuery] string code)
        {
            return await accountService.SetTwoFAAsync(code);
        }
    }
}
