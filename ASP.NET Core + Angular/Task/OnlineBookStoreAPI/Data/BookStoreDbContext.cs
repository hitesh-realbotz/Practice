using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Models.Domain;


namespace OnlineBookStoreAPI.Data
{
    public class BookStoreDbContext : IdentityDbContext<AppUser>
    {
        public BookStoreDbContext(DbContextOptions options) : base(options)
        {
        }

        //Books
        public DbSet<Book> Books { get; set; }

        //UserCart
        public DbSet<Cart> Carts { get; set; }

        //CartItems
        public DbSet<CartItem> CartItems { get; set; }

        //Orders
        public DbSet<Order> Orders { get; set; }

        //OrderItems
        public DbSet<OrderItem> OrderItems { get; set; }

        //OrderedBooks
        public DbSet<OrderBook> OrderBooks { get; set; }

        //Photos
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);

            modelbuilder.Entity<AppUser>().Property(u => u.Email).IsRequired();
            modelbuilder.Entity<AppUser>().HasIndex(u => u.Email).IsUnique();
            modelbuilder.Entity<AppUser>().HasIndex(u => u.NormalizedEmail).IsUnique();

            modelbuilder.Entity<Book>().HasIndex(b => b.ISBN).IsUnique();
            modelbuilder.Entity<Book>().HasIndex(b => b.Title).IsUnique();

            modelbuilder.Entity<OrderBook>().HasIndex(b => b.ISBN);
            modelbuilder.Entity<OrderBook>().HasIndex(b => b.Title);

        }

    }
}
