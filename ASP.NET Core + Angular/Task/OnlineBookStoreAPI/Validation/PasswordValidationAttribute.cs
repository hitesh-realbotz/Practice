using OnlineBookStoreAPI.Constants;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace OnlineBookStoreAPI.Validation
{
    public class PasswordValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value != null)
            {
                string password = value.ToString();

                if (!Regex.IsMatch(password, Const.PASSWORD_VALIDATION_REGEX))
                {
                    return new ValidationResult(ErrorMessage);
                }
            }

            return ValidationResult.Success;
        }
    }
}
