using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;

namespace OnlineBookStoreAPI.Repositories.Interfaces
{
    public interface IBookRepository
    {
        public Task<Book> CreateAsync(Book book);
        public Task<Book?> GetByTitleAsync(string title);
        public Task<Book?> GetByISBNAsync(string isbn);
        public Task<PagedList<BookDto?>> GetBooksAsync(BookParams bookParams);
    }
}
