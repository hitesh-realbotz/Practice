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


        //Creates new book
        public async Task<Book> CreateAsync(Book book)
        {
            await dbContext.AddAsync(book);
            await dbContext.SaveChangesAsync();
            return book;
        }

        //PagedList of books
        public async Task<PagedList<BookDto?>> GetBooksAsync(BookParams bookParams)
        {
            var query = dbContext.Books.Include(b => b.Photos).AsQueryable();
            
            if (bookParams.MaxPrice > bookParams.MinPrice)
            {
                query = query.Where(b => b.UnitPrice >= bookParams.MinPrice && b.UnitPrice <= bookParams.MaxPrice);
            }
            else
            {
                query = query.Where(b => b.UnitPrice >= bookParams.MinPrice);
            }
            query = bookParams.SortBy switch
            {
                //Const.TITLE => (bookParams.SortOrder == Const.ASCENDING ? query.OrderBy(b => b.Title) : query.OrderByDescending(b => b.Title)),
                Const.AUTHOR => (bookParams.SortOrder == Const.ASCENDING ? query.OrderBy(b => b.Author) : query.OrderByDescending(b => b.Author)),
                Const.PRICE => (bookParams.SortOrder == Const.ASCENDING ? query.OrderBy(b => b.UnitPrice) : query.OrderByDescending(b => b.UnitPrice)),
                _ => (bookParams.SortOrder == Const.ASCENDING ? query.OrderBy(b => b.Title) : query.OrderByDescending(b => b.Title)),
            };

            return await PagedList<BookDto>.CreateAsync(query.ProjectTo<BookDto>(mapper.ConfigurationProvider), bookParams.PageNumber, bookParams.PageSize);

        }

        //Gets book by title
        public async Task<Book?> GetByTitleAsync(string title)
        {
            return await dbContext.Books.Include(b => b.Photos).FirstOrDefaultAsync(b => b.Title == title);
        }

        //Gets book by ISBNCode
        public async Task<Book?> GetByISBNAsync(string isbn)
        {
            return await dbContext.Books.Include(b => b.Photos).SingleOrDefaultAsync(book => book.ISBN == isbn);
        }
    }
}
