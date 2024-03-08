using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace OnlineBookStoreAPI.Models.Domain
{
    public class AppUser : IdentityUser
    {
        public string? Gender { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
    }
}
