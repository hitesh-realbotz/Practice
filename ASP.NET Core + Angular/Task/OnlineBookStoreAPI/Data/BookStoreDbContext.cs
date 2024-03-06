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


        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);

            modelbuilder.Entity<AppUser>().Property(u => u.Email).IsRequired();
            modelbuilder.Entity<AppUser>().HasIndex(u => u.Email).IsUnique();
            modelbuilder.Entity<AppUser>().HasIndex(u => u.NormalizedEmail).IsUnique();
        }

    }
}
