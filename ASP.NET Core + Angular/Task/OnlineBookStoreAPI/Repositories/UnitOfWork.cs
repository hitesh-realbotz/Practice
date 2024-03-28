using AutoMapper;
using Microsoft.EntityFrameworkCore.Storage;
using OnlineBookStoreAPI.Data;
using OnlineBookStoreAPI.Repositories.Interfaces;

namespace OnlineBookStoreAPI.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IServiceProvider serviceProvider;
        private readonly BookStoreDbContext dbContext;
        private readonly IMapper mapper;
        private IDbContextTransaction transaction;

        public UnitOfWork(IServiceProvider serviceProvider, BookStoreDbContext dbContext, IMapper mapper)
        {
            this.serviceProvider = serviceProvider;
            this.dbContext = dbContext;
            this.mapper = mapper;
            BookRepository = serviceProvider.GetRequiredService<IBookRepository>();
            UserRepository = serviceProvider.GetRequiredService<IUserRepository>();
            CartRepository = serviceProvider.GetRequiredService<ICartRepository>();
            CartItemRepository = serviceProvider.GetRequiredService<ICartItemRepository>();
            OrderRepository = serviceProvider.GetRequiredService<IOrderRepository>();
            OrderBookRepository = serviceProvider.GetRequiredService<IOrderBookRepository>();

        }
        public IBookRepository BookRepository { get; }
        public IUserRepository UserRepository { get; }
        public ICartRepository CartRepository { get; }
        public ICartItemRepository CartItemRepository { get; }
        public IOrderRepository OrderRepository { get; }
        public IOrderBookRepository OrderBookRepository { get; }

        public async Task<bool> BeginTransaction()
        {
            transaction = dbContext.Database.BeginTransaction();
            return true;
        }

        public async Task<bool> Commit()
        {
            try
            {
                await dbContext.SaveChangesAsync();
                await transaction.CommitAsync();
                return true;
            }
            catch (Exception)
            {

                Rollback();
                return false;
            }
        }


        public async void Rollback()
        {
            await transaction.RollbackAsync();
        }

        public void SaveChanges()
        {
            dbContext.SaveChanges();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await dbContext.SaveChangesAsync() > 0;
        }
        public async void Dispose()
        {
            await dbContext.DisposeAsync();
        }
    }
}
