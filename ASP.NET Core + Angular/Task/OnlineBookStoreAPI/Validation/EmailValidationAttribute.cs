using OnlineBookStoreAPI.Constants;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace OnlineBookStoreAPI.Validation
{
    public class EmailValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value != null)
            {
                string email = value.ToString();

                if (!Regex.IsMatch(email, Const.EMAIL_VALIDATION_REGEX))
                {
                    return new ValidationResult(ErrorMessage);
                }
            }

            return ValidationResult.Success;
        }
    }
}
