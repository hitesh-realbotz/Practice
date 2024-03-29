using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Data;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Repositories.Interfaces;

namespace OnlineBookStoreAPI.Repositories
{
    public class OrderBookRepository : IOrderBookRepository
    {
        private readonly BookStoreDbContext dbContext;

        public OrderBookRepository(BookStoreDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //Gets ordered book by bookId
        public async Task<List<OrderBook?>> GetOrderBookByBookId(int bookId)
        {
           return await dbContext.OrderBooks.Where(ob => ob.BookId ==  bookId).ToListAsync();
        }
    }
}
