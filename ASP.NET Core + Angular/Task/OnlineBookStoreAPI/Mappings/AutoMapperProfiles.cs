using AutoMapper;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Services.Interfaces;

namespace OnlineBookStoreAPI.Mappings
{
    public class AutoMapperProfiles : Profile
    {
       
        public AutoMapperProfiles()
        {

            CreateMap<RegisterDto, AppUser>().ReverseMap();
            CreateMap<LoginDto, AppUser>().ReverseMap();
            CreateMap<LoginDto, AppUser>().ReverseMap();
           
            CreateMap<AppUser, UserProfileDto>().ReverseMap();
            
            CreateMap<BookDto, Book>().ReverseMap();
            CreateMap<PhotoDto, Photo>().ReverseMap();
            CreateMap<UserProfileDto, SignUpResponseDto>().ReverseMap();
            
        }
    }
}
