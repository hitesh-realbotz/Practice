using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OnlineBookStoreAPI.Constants;
using OnlineBookStoreAPI.Data;
using OnlineBookStoreAPI.Helpers;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Repositories.Interfaces;

namespace OnlineBookStoreAPI.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly BookStoreDbContext dbContext;
        private readonly IMapper mapper;

        public BookRepository(BookStoreDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<Book> CreateAsync(Book book)
        {
            await dbContext.AddAsync(book);
            await dbContext.SaveChangesAsync();
            return book;
        }

        public async Task<PagedList<BookDto?>> GetBooksAsync(BookParams bookParams)
        {
            var query = dbContext.Books.Include(b => b.Photos).AsQueryable();
            
            if (bookParams.MaxPrice > bookParams.MinPrice)
            {
                query = query.Where(b => b.Price >= bookParams.MinPrice && b.Price <= bookParams.MaxPrice);
            }
            else
            {
                query = query.Where(b => b.Price >= bookParams.MinPrice);
            }
            query = bookParams.SortBy switch
            {
                Const.TITLE => (bookParams.SortOrder == Const.ASCENDING ? query.OrderBy(b => b.Title) : query.OrderByDescending(b => b.Title)),
                Const.AUTHOR => (bookParams.SortOrder == Const.ASCENDING ? query.OrderBy(b => b.Author) : query.OrderByDescending(b => b.Author)),
                Const.PRICE => (bookParams.SortOrder == Const.ASCENDING ? query.OrderBy(b => b.Price) : query.OrderByDescending(b => b.Price)),
            };

            return await PagedList<BookDto>.CreateAsync(query.ProjectTo<BookDto>(mapper.ConfigurationProvider), bookParams.PageNumber, bookParams.PageSize);

        }

        public async Task<Book?> GetByTitleAsync(string title)
        {
            return await dbContext.Books.Include(b => b.Photos).FirstOrDefaultAsync(b => b.Title == title);
        }
        public async Task<Book?> GetByISBNAsync(string isbn)
        {
            return await dbContext.Books.Include(b => b.Photos).SingleOrDefaultAsync(book => book.ISBN == isbn);
            //return null;

        }
    }
}
