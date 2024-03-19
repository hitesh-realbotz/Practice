﻿using AutoMapper;
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

            CreateMap<Book, BookDto>()
                .ForMember(bd => bd.PhotoUrl, opt => opt.MapFrom(b => b.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<BookDto, Book>();
            CreateMap<PhotoDto, Photo>().ReverseMap();

            CreateMap<UserProfileDto, SignUpResponseDto>();
            CreateMap<SignUpResponseDto, UserProfileDto>();
            CreateMap<CartItem, CartItemDto>()
                .ForMember(cd => cd.TotalPrice, opt => opt.MapFrom(c => (c.Quantity * c.Book.Price)));
            CreateMap<Cart, CartDto>()
               .ForMember(cd => cd.TotalPrice, opt => opt.MapFrom(c => (c.CartItems.Sum(ci => (ci.Quantity * ci.Book.Price)))))
               .ForMember(cd => cd.TotalCheckedPrice, opt => opt.MapFrom(c => (c.CartItems.Sum(ci => ci.Checked ? (ci.Quantity * ci.Book.Price) : 0))));               
        }


    }
}
