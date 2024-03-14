namespace OnlineBookStoreAPI.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        public IBookRepository BookRepository { get; }
        public IUserRepository UserRepository { get; }

        void SaveChanges();
        Task<bool> SaveChangesAsync();
        void BeginTransaction();
        Task<bool> Commit();
        void Rollback();
    }
}
