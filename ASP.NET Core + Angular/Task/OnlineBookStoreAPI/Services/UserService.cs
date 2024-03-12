using AutoMapper;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Repositories.Interfaces;
using OnlineBookStoreAPI.Services.Interfaces;
using System.Security.Claims;

namespace OnlineBookStoreAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly ITokenService tokenService;

        public UserService(IUnitOfWork uow, IMapper mapper, IHttpContextAccessor httpContextAccessor, ITokenService tokenService)
        {
            this.uow = uow;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
            this.tokenService = tokenService;
        }

        public async Task<UserProfileDto> UpdateAsync(UserProfileUpdateDto updateDto)
        {
            var email = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value.ToString();
            var existingUser = await uow.UserRepository.GetUserByEmailAsync(email);
            if (existingUser == null) throw new BadHttpRequestException($"User with {email} not found!");
            existingUser.Name = updateDto.Name;
            existingUser.Gender = updateDto.Gender;
            existingUser.City = updateDto.City;
            existingUser.Country = updateDto.Country;
            if(await uow.SaveChangesAsync())
            {
                var userProfileDto = mapper.Map<UserProfileDto>(existingUser);
                userProfileDto.Token = await tokenService.CreateToken(existingUser);
                return userProfileDto;
            }
            throw new BadHttpRequestException("Failed to update user details.");
        }
    }
}
