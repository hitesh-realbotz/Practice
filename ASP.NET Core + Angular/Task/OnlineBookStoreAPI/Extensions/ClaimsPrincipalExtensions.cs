using System.Security.Claims;

namespace OnlineBookStoreAPI.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetEmail(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Email)?.Value;
        }

        public static string GetUserId(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Sid)?.Value;
        }
        public static string IsTwoFactorEnabled(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Authentication)?.Value;
        }
    }
}
