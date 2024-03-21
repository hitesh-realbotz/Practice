using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace OnlineBookStoreAPI.Models.Domain
{
    public class AppUser : IdentityUser
    {
        public string? Name { get; set; }
        public string? Gender { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }

        public List<Photo> Photos { get; set; } = new();
        public Cart Cart { get; set; }
        public List<Order> Orders { get; set; }
    }
}
