namespace OnlineBookStoreAPI.Models.DTOs
{
    public class SignUpResponseDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public bool IsTwoFAEnabled { get; set; }
    }
}
