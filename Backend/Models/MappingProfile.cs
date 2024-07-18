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

            CreateMap<Airport, AirportDto>().ReverseMap();
            CreateMap<AirportDto, Airport>()
                .ForMember(dest => dest.AirportId, opt => opt.Ignore());

            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<UserDto, User>()
                .ForMember(dest => dest.UserId, opt => opt.Ignore());

            CreateMap<Flight, FlightDto>()
                .ForMember(dto => dto.DiscountId, conf => conf.MapFrom(ol => ol.Discount != null ? ol.Discount.DiscountId : (int?)null));

            CreateMap<FlightDto, Flight>()
                .ForMember(dest => dest.FlightNumber, opt => opt.Ignore());

            CreateMap<Ticket, TicketDto>()
                .ForMember(dto => dto.CheckInId, conf => conf.MapFrom(ol => ol.CheckIn != null ? ol.CheckIn.CheckInId : (int?)null));

            CreateMap<TicketDto, Ticket>()
                .ForMember(dest => dest.TicketId, opt => opt.Ignore());

            CreateMap<Discount, DiscountDto>().ReverseMap();
            CreateMap<DiscountDto, Discount>()
                .ForMember(dest => dest.DiscountId, opt => opt.Ignore());

            CreateMap<CheckIn, CheckInDto>().ReverseMap();
            CreateMap<CheckInDto, CheckIn>()
                .ForMember(dest => dest.CheckInId, opt => opt.Ignore());
        }

    }
}
