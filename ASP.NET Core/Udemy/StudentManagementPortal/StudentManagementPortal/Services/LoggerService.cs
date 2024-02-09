using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Repositories.Interfaces;
using StudentManagementPortal.Services.Interfaces;

namespace StudentManagementPortal.Services
{
    public class LoggerService : ILoggerService
    {
        private readonly ILoggerRepository loggerRepository;

        public LoggerService(ILoggerRepository loggerRepository)
        {
            this.loggerRepository = loggerRepository;
        }
        public async Task<LogInfo> CreateAsync(User user)
        {

            LogInfo logInfo = await loggerRepository.GetByUserId(user.Id);
            var newLogInfo = new LogInfo();
            if (logInfo != null)
            {
                newLogInfo.Detail = (Convert.ToInt32(logInfo.Detail) + 1).ToString();

            }
            else
            {

                newLogInfo.Detail = 1.ToString();
            }
            newLogInfo.UserId = user.Id;
            newLogInfo.LogTime = DateTime.Now;
            newLogInfo.Type = "Password Fail";

            return await loggerRepository.CreateAsync(newLogInfo);
        }

    }
}
