namespace OnlineBookStoreAPI.Models.DTOs
{
    public class LoginResponseDto
    {
        public string Email { get; set; }
        public string Token { get; set; }

        public string Gender { get; set; }
        public bool IsTwoFAEnabled { get; set; }
    }
}
