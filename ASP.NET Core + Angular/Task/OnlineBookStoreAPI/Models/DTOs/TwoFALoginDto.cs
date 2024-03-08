using System.ComponentModel.DataAnnotations;

namespace OnlineBookStoreAPI.Models.DTOs
{
    public class TwoFALoginDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Code { get; set; }
    }
}
