using AutoMapper;
using DatingApp.Data;
using DatingApp.DTOs;
using DatingApp.Entities;
using DatingApp.Extensions;
using DatingApp.Interfaces;
using DatingApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace DatingApp.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, IMapper mapper)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.UserName)) return BadRequest("Username is taken");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.UserName.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                UserName = user.UserName,
                Token = await _tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);

            if (user == null) return Unauthorized("Invalid username");

            //if (user.LockoutEnd >= DateTime.Now)
            //{
            //    return Unauthorized($"User Locked till {user.LockoutEnd}");
            //}
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result)
            {
                //var attempts = await _userManager.AccessFailedAsync(user);
                //if (user.AccessFailedCount == 3)
                //{
                //    var passStatus = await _userManager.SetLockoutEndDateAsync(user, new DateTimeOffset(DateTime.Now.AddMinutes(1)));
                //    return Unauthorized($"User Locked till {user.LockoutEnd}");
                //}
                return Unauthorized("Invalid Password!");
            }

            return new UserDto
            {
                UserName = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }


    //Without ASP.NET Identity
    //public class AccountController : BaseApiController
    //{
    //    private readonly DataContext _context;
    //    private readonly ITokenService _tokenService;
    //    private readonly IMapper _mapper;

    //    public AccountController(DataContext context, ITokenService tokenService, IMapper mapper)
    //    {
    //        _context = context;
    //        _tokenService = tokenService;
    //        _mapper = mapper;
    //    }

    //    [HttpPost("register")]
    //    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    //    {
    //        if (await UserExists(registerDto.UserName)) return BadRequest("Username is taken");

    //        var user = _mapper.Map<AppUser>(registerDto);

    //        using var hmac = new HMACSHA512();

    //        user.UserName = registerDto.UserName.ToLower();
    //        user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
    //        user.PasswordSalt = hmac.Key;

    //        _context.Users.Add(user);
    //        await _context.SaveChangesAsync();

    //        return new UserDto
    //        {
    //            UserName = user.UserName,
    //            Token = _tokenService.CreateToken(user),
    //            KnownAs = user.KnownAs,
    //            Gender = user.Gender
    //        };
    //    }

    //    [HttpPost("login")]
    //    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    //    {
    //        var user = await _context.Users
    //            .Include(p => p.Photos)
    //            .SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);

    //        if (user == null) return Unauthorized("Invalid username");

    //        using var hmac = new HMACSHA512(user.PasswordSalt);

    //        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

    //        for (int i = 0; i < computedHash.Length; i++)
    //        {
    //            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
    //        }

    //        return new UserDto
    //        {
    //            UserName = user.UserName,
    //            Token = _tokenService.CreateToken(user),
    //            PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
    //            KnownAs = user.KnownAs,
    //            Gender = user.Gender
    //        };
    //    }

    //    private async Task<bool> UserExists(string username)
    //    {
    //        return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
    //    }
    //}

}


