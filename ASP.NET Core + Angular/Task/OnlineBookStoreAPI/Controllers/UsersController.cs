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


        //Gets cartItemCount & OrderCount
        [HttpGet]
        public async Task<ActionResult<UserDashboardStatisticDto>> GetUser()
        {
            return await userService.GetUserDashStatAsync();
        }


        //Updates user profile
        [HttpPost("update")]
        [Authorize]
        public async Task<ActionResult<UserProfileDto>> UpdateProfile(UserProfileUpdateDto userProfileUpdateDto)
        {
            return await userService.UpdateAsync(userProfileUpdateDto);
        }


        //Upload user photo
        [HttpPost("addphoto")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await userService.AddPhotoAsync(file);
            return CreatedAtAction(nameof(GetUser), new { email = user.Email },
                mapper.Map<PhotoDto>(user.Photos.Last()));
        }


        //Set main photo
        [HttpPut("set-main-photo")]
        public async Task<ActionResult<UserProfileDto>> SetMainPhoto([FromQuery] string publicId)
        {
            return await userService.SetMainPhotoAsync(publicId);

        }


        //Deletes photo
        [HttpDelete("delete-photo")]
        public async Task<ActionResult<UserProfileDto>> DeletePhoto([FromQuery] string publicId)
        {
            return await userService.DeletePhotoAsync(publicId);

        }
    }
}
