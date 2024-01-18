using AutoMapper;
using NZWalksAPI.Models.Domain;
using NZWalksAPI.Models.DTO;

namespace NZWalksAPI.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //CreateMap<UserDTO, UserDomain>();
            //CreateMap<UserDTO, UserDomain>().ReverseMap();

            //CreateMap<UserDTO, UserDomain>()
            //    .ForMember(x => x.Name, opt => opt.MapFrom(x => x.FullName));
            //CreateMap<UserDTO, UserDomain>()
            //    .ForMember(x => x.Name, opt => opt.MapFrom(x => x.FullName))
            //    .ReverseMap();

            CreateMap<Region, RegionDto>()
                
                .ReverseMap();
            CreateMap<AddRegionRequestDto, Region>();
            CreateMap<UpdateRegionRequestDto, Region>();

        }

    }
    //public class UserDTO
    //{
    //    //public string Name { get; set; }
    //    public string FullName { get; set; }
    //}
    //public class UserDomain
    //{
    //    public string Name { get; set; }
    //}
}
