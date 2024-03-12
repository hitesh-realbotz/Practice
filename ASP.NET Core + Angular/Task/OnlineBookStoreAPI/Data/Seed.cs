using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Repositories.Interfaces;
using System.Text.Json;

namespace OnlineBookStoreAPI.Data
{
    public class Seed
    {

        public static async Task SeedBooks(BookStoreDbContext dbContext)
        {

            if (await dbContext.Books.AnyAsync()) return;
            var booksData = await File.ReadAllTextAsync("Data/bookSeedData.json");
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var books = JsonSerializer.Deserialize<List<Book>>(booksData, options);


            foreach (var book in books)
            {
                await dbContext.Books.AddAsync(book);
                await dbContext.SaveChangesAsync();

            }


        }
    }
}
