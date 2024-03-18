using Microsoft.AspNetCore.Mvc;
using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;

namespace OnlineBookStoreAPI.Services.Interfaces
{
    public interface IBookService
    {
        public Task<BookDto> CreateAsync(BookDto dto);
        public Task<BookDto> GetBookByTitleAsync(string title);
        public Task<BookDto> GetBookByISBNAsync(string isbn);
        public Task<List<BookDto?>> AddPhotoAsync(List<IFormFile> files);
        public Task<PagedList<BookDto?>> GetBooksAsync(BookParams bookParams);
        
    }
}
