namespace OnlineBookStoreAPI.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        public IBookRepository BookRepository { get; }
        public IUserRepository UserRepository { get; }
        public ICartRepository CartRepository { get; }

        void SaveChanges();
        Task<bool> SaveChangesAsync();
        Task<bool> BeginTransaction();
        Task<bool> Commit();
        void Rollback();
    }
}
