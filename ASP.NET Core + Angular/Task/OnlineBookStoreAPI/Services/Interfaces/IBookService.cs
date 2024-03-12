using Microsoft.AspNetCore.Mvc;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;

namespace OnlineBookStoreAPI.Services.Interfaces
{
    public interface IBookService
    {
        public Task<BookDto> CreateAsync(BookDto dto);
        public Task<List<BookDto?>> AddPhotoAsync(List<IFormFile> files);
    }
}
