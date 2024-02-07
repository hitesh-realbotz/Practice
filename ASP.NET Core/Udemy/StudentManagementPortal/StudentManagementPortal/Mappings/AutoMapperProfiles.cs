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

            CreateMap<Student, StudentDto>().ReverseMap();
            CreateMap<Student, StudentProfileDto>().ReverseMap();

            CreateMap<Admin, AdminDto>().ReverseMap();

            CreateMap<Result, ResultDto>().ReverseMap();
            CreateMap<AddResultRequestDto, Result>().ReverseMap();

            CreateMap<ResultSubject, ResultSubjectDto>().ReverseMap();
            CreateMap<AddSubjectRequestDto, ResultSubject>().ReverseMap();



        }

    }
}
