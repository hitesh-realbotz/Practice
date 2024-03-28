using OnlineBookStoreAPI.Models.Domain;

namespace OnlineBookStoreAPI.Repositories.Interfaces
{
    public interface IOrderBookRepository
    {
        public Task<List<OrderBook?>> GetOrderBookByBookId(int bookId);
    }
}
