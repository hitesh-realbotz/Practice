using AutoMapper;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;

namespace StudentManagementPortal.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<AddUserRequestDto, User>().ReverseMap();

        }

    }
}
