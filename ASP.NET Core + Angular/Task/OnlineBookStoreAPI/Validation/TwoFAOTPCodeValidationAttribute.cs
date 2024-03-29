using OnlineBookStoreAPI.Constants;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace OnlineBookStoreAPI.Validation
{
    public class TwoFAOTPCodeValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value != null)
            {
                string code = value.ToString();

                if (!Regex.IsMatch(code, Const.OTP_VALIDATION_REGEX))
                {
                    return new ValidationResult(ErrorMessage);
                }
            }

            return ValidationResult.Success;
        }
    }
}
