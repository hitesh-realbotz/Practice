using System.ComponentModel.DataAnnotations;

namespace OnlineBookStoreAPI.Models.DTOs
{
    public class SetTwoFADto
    {
        [Required]
        public string Code { get; set; }
    }
}
