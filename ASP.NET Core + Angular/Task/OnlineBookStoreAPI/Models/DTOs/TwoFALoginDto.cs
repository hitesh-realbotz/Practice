using Microsoft.Extensions.Configuration;
using OnlineBookStoreAPI.Constants;
using OnlineBookStoreAPI.Validation;
using System.ComponentModel.DataAnnotations;

namespace OnlineBookStoreAPI.Models.DTOs
{
    public class TwoFALoginDto
    {
        [Required]
        [EmailValidation(ErrorMessage = Const.EMAIL_VALIDATION_ERROR_MSG)]
        public string Email { get; set; }
        [Required]
        [TwoFAOTPCodeValidation(ErrorMessage = Const.OTP_VALIDATION_ERROR_MSG)]
        public string Code { get; set; }
    }
}
