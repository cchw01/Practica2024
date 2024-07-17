using Backend.DTOs;
using AutoMapper;

namespace Backend.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Aircraft, AircraftDto>().ReverseMap();
            CreateMap<AircraftDto, Aircraft>()
                .ForMember(dest => dest.AircraftId, opt => opt.Ignore()); 
        }
    }
}
