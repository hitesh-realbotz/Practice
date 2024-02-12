using StudentManagementPortal.Models.Domain;

namespace StudentManagementPortal.Services.Interfaces
{
    public interface ILoggerService
    {
        Task<LogInfo> CreateAsync(User user, bool isSignIn = false);
        Task<LogInfo> CreateUpdateLogAsync(string actionOn, object actionData);
        Task<LogInfo> CreateDeleteLogAsync(string actionOn, object actionData);
    }
}
