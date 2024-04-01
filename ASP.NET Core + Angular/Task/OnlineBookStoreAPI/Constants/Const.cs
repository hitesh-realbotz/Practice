
namespace OnlineBookStoreAPI.Constants
{
    public static class Const
    {
        //SortBy
        public const string TITLE = "Title";
        public const string PRICE = "Price";
        public const string AUTHOR = "Author";
        public const string Id = "Id";
        public const string Date = "Date";



        //SortOrder
        public const string ASCENDING = "Ascending";
        public const string DESCENDING = "Descending";


        public const string EMAIL_VALIDATION_ERROR_MSG = "Invalid Email Address Format.";
        public const string PASSWORD_VALIDATION_ERROR_MSG = "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit and one special character.";
        public const string EMAIL_VALIDATION_REGEX = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
        public const string PASSWORD_VALIDATION_REGEX = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])(?=.*[!@#$%^&*]).{8,}$";
        public const string OTP_VALIDATION_REGEX = @"^(?=.*\d).{6}$";
        public const string OTP_VALIDATION_ERROR_MSG = @"^(?=.*\d).{6}$";

    }
}
