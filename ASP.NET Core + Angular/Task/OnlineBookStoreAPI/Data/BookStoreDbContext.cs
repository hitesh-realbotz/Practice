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

        public DbSet<Book> Books { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);

            modelbuilder.Entity<AppUser>().Property(u => u.Email).IsRequired();
            modelbuilder.Entity<AppUser>().HasIndex(u => u.Email).IsUnique();
            modelbuilder.Entity<AppUser>().HasIndex(u => u.NormalizedEmail).IsUnique();

            //modelbuilder.Entity<Book>().Property(b => b.ISBN).IsRequired();
            modelbuilder.Entity<Book>().HasIndex(b => b.ISBN).IsUnique();
            modelbuilder.Entity<Book>().HasIndex(b => b.Title).IsUnique();

        }

    }
}
