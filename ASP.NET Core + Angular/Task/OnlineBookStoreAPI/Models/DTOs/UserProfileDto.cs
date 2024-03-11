using OnlineBookStoreAPI.Models.Domain;

namespace OnlineBookStoreAPI.Models.DTOs
{
    public class UserProfileDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        
        public string Gender { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public bool TwoFactorEnabled { get; set; }
        public List<PhotoDto> Photos { get; set; }


    }
}
