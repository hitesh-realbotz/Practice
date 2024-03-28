using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Services;
using OnlineBookStoreAPI.Services.Interfaces;

namespace OnlineBookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IMapper mapper;

        public UsersController(IUserService userService, IMapper mapper)
        {
            this.userService = userService;
            this.mapper = mapper;
        }

        [HttpPost("update")]
        [Authorize]
        public async Task<ActionResult<UserProfileDto>> UpdateProfile(UserProfileUpdateDto userProfileUpdateDto)
        {
            return await userService.UpdateAsync(userProfileUpdateDto);
        }

        //[HttpGet("{email}")]
        //public async Task<ActionResult<UserProfileDto>> GetUser(string email)
        //{
        //    return await userService.GetUserAsync(email);
        //} 
       
        [HttpGet]
        public async Task<ActionResult<UserDashboardStatisticDto>> GetUser()
        {
            return await userService.GetUserDashStatAsync();
        }

        [HttpPost("addphoto")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await userService.AddPhotoAsync(file);
            return CreatedAtAction(nameof(GetUser), new { email = user.Email },
                mapper.Map<PhotoDto>(user.Photos.Last()));
        }

        [HttpPut("set-main-photo")]
        public async Task<ActionResult<UserProfileDto>> SetMainPhoto([FromQuery] string publicId)
        {
           return await userService.SetMainPhotoAsync(publicId);
            
        }

        [HttpDelete("delete-photo")]
        public async Task<ActionResult<UserProfileDto>> DeletePhoto([FromQuery] string publicId)
        {
            return await userService.DeletePhotoAsync(publicId);
            
        }
    }
}
