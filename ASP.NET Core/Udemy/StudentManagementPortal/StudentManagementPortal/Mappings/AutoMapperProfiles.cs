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
            CreateMap<Subject, SubjectDto>().ReverseMap();

            CreateMap<UpdateStudentRequestDto, Student>();
            CreateMap<UpdateStudentByAdminRequestDto, Student>();

            CreateMap<AddResultRequestDto, Result>()
                .ForMember(r => r.TotalObtainedMarks, opt => opt.MapFrom(rd => rd.Subjects.Sum(rs => rs.ObtainedMarks)))
                .ForMember(r => r.TotalMarks, opt => opt.MapFrom(rd => rd.Subjects.Sum(rs => rs.TotalMarks)))
                .ForMember(r => r.IsPass, opt => opt.MapFrom(rd => rd.Subjects.All(rs => rs.ObtainedMarks >= (0.35 * rs.TotalMarks))));
                

            CreateMap<AddSubjectRequestDto, Subject>().ForMember(rs => rs.IsPass, opt => opt.MapFrom(sd => sd.ObtainedMarks >= (0.35 * sd.TotalMarks)));

            
            




        }

    }
}
