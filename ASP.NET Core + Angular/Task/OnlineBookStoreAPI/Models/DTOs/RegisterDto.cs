using OnlineBookStoreAPI.Constants;
using OnlineBookStoreAPI.Validation;
using System.ComponentModel.DataAnnotations;

namespace OnlineBookStoreAPI.Models.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailValidation(ErrorMessage = Const.EMAIL_VALIDATION_ERROR_MSG)]
        public string Email { get; set; }

        [Required]
        [PasswordValidation(ErrorMessage = Const.PASSWORD_VALIDATION_ERROR_MSG)]
        public string Password { get; set; }
    }
}
