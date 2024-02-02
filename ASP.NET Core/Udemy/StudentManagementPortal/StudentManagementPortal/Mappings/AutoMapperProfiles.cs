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
            CreateMap<Student, StudentDto>().ReverseMap();
            CreateMap<Student, StudentProfileDto>().ReverseMap();
            CreateMap<Admin, AdminDto>().ReverseMap();
            CreateMap<AddUserRequestDto, User>().ReverseMap();
            CreateMap<AddResultRequestDto, Result>().ReverseMap();
            CreateMap<AddSubjectRequestDto, ResultSubject>().ReverseMap();
            CreateMap<Result, ResultDto>().ReverseMap();
            CreateMap<ResultSubject, ResultSubjectDto>().ReverseMap();

        }

    }
}
