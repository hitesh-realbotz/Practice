using AutoMapper;
using OnlineBookStoreAPI.Models.Domain;
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
        private readonly IPhotoService photoService;

        public UserService(IUnitOfWork uow, IMapper mapper, IHttpContextAccessor httpContextAccessor, ITokenService tokenService, IPhotoService photoService)
        {
            this.uow = uow;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
            this.tokenService = tokenService;
            this.photoService = photoService;
        }

        public async Task<UserProfileDto> AddPhotoAsync(IFormFile file)
        {
            AppUser? user = await UserExists();

            var result = await photoService.AddPhotoAsync(file);

            if (result.Error != null) throw new BadHttpRequestException(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (user.Photos.Count == 0) photo.IsMain = true;

            user.Photos.Add(photo);

            if (await uow.SaveChangesAsync())
                return mapper.Map<UserProfileDto>(user);

            throw new BadHttpRequestException("Problem adding photo");
        }

        public async Task<UserProfileDto> SetMainPhotoAsync(string publicId)
        {
            uow.BeginTransaction();
            AppUser? user = await UserExists();

            var photo = user.Photos.FirstOrDefault(x => x.PublicId == publicId);

            if (photo == null) throw new BadHttpRequestException("Photo not found!");

            if (photo.IsMain) throw new BadHttpRequestException("This is already your main photo");

            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if (await uow.Commit()) return mapper.Map<UserProfileDto>(user);

            throw new BadHttpRequestException("Problem setting main photo");
        }


        public async Task<UserProfileDto> DeletePhotoAsync(string publicId)
        {
            uow.BeginTransaction();
            AppUser? user = await UserExists();

            var photo = user.Photos.FirstOrDefault(x => x.PublicId == publicId);

            if (photo == null) throw new BadHttpRequestException("Photo not found!");

            if (photo.IsMain) throw new BadHttpRequestException("You cannot delete your main photo.");

            
            if (photo.PublicId != null)
            {
                var result = await photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) throw new BadHttpRequestException(result.Error.Message);
            }

            user.Photos.Remove(photo);

            if (await uow.Commit()) return mapper.Map<UserProfileDto>(user);

            throw new BadHttpRequestException("Problem deleting photo");
        }

        public async Task<UserProfileDto> GetUserAsync(string email)
        {
            return mapper.Map<UserProfileDto>(await uow.UserRepository.GetUserByEmailAsync(email));
        }

        public async Task<UserProfileDto> UpdateAsync(UserProfileUpdateDto updateDto)
        {
            AppUser? existingUser = await UserExists();
            existingUser.Name = updateDto.Name;
            existingUser.Gender = updateDto.Gender;
            existingUser.City = updateDto.City;
            existingUser.Country = updateDto.Country;
            if (await uow.SaveChangesAsync())
            {
                var userProfileDto = mapper.Map<UserProfileDto>(existingUser);
                userProfileDto.Token = await tokenService.CreateToken(existingUser);
                return userProfileDto;
            }
            throw new BadHttpRequestException("Failed to update user details.");
        }

        private async Task<AppUser?> UserExists()
        {
            var email = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value.ToString();
            var existingUser = await uow.UserRepository.GetUserByEmailAsync(email);
            if (existingUser == null) throw new BadHttpRequestException($"User with {email} not found!");
            return existingUser;
        }

       
    }
}
