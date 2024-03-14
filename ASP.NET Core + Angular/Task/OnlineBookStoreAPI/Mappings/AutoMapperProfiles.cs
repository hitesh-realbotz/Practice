using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;

using OnlineBookStoreAPI.Services.Interfaces;
using OnlineBookStoreAPI.Services;

namespace OnlineBookStoreAPI.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        private readonly IConfiguration config;
        public AutoMapperProfiles()
        {
        }

        public AutoMapperProfiles(IConfiguration config)
        {
            this.config = config;
            var tokenConfig = new TokenService(config);
            CreateMap<RegisterDto, AppUser>().ReverseMap();
            CreateMap<LoginDto, AppUser>().ReverseMap();

            CreateMap<AppUser, UserProfileDto>()
                .ForMember(up => up.PhotoUrl, opt => opt.MapFrom(u => u.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(up => up.Token, opt => opt.MapFrom(u => tokenConfig.CreateToken(u).Result));

            CreateMap<UserProfileDto, AppUser>();

            CreateMap<BookDto, Book>().ReverseMap();
            CreateMap<PhotoDto, Photo>().ReverseMap();

            CreateMap<UserProfileDto, SignUpResponseDto>();
            CreateMap<SignUpResponseDto, UserProfileDto>();
                
        }


    }
}
