using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Data;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Repositories.Interfaces;

namespace OnlineBookStoreAPI.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly BookStoreDbContext dbContext;

        public BookRepository(BookStoreDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Book> CreateAsync(Book book)
        {
            await dbContext.AddAsync(book);
            await dbContext.SaveChangesAsync();
            return book;
        }

        public async Task<Book> GetByTitleAsync(string title)
        {
            return await dbContext.Books.FirstOrDefaultAsync(b => b.Title == title);
        }
    }
}
