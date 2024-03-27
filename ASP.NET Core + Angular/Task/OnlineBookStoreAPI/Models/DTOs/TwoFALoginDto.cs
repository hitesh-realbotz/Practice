using System.ComponentModel.DataAnnotations;

namespace OnlineBookStoreAPI.Models.DTOs
{
    public class TwoFALoginDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Code { get; set; }
    }
}
