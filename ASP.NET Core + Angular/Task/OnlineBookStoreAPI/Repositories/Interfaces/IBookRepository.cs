using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;

namespace OnlineBookStoreAPI.Repositories.Interfaces
{
    public interface IBookRepository
    {
        public Task<Book> CreateAsync(Book book);
        public Task<Book> GetByTitleAsync(string title);
    }
}
