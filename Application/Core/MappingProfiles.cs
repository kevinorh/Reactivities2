using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //<InputClass,OutputClass>
            CreateMap<Activity, Activity>();
        }
    }
}