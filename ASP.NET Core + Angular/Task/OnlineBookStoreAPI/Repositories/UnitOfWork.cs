using Microsoft.EntityFrameworkCore.Storage;
using OnlineBookStoreAPI.Data;
using OnlineBookStoreAPI.Repositories.Interfaces;

namespace OnlineBookStoreAPI.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IServiceProvider serviceProvider;
        private readonly BookStoreDbContext dbContext;
        private IDbContextTransaction transaction;

        public UnitOfWork(IServiceProvider serviceProvider, BookStoreDbContext dbContext)
        {
            this.serviceProvider = serviceProvider;
            this.dbContext = dbContext;
            this.dbContext = dbContext;
            BookRepository = serviceProvider.GetRequiredService<IBookRepository>();
            this.serviceProvider = serviceProvider;
        }
        public IBookRepository BookRepository { get; }

        public void BeginTransaction()
        {
            transaction = dbContext.Database.BeginTransaction();
        }

        public async void Commit()
        {
            try
            {
                await dbContext.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception)
            {

                Rollback();
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
