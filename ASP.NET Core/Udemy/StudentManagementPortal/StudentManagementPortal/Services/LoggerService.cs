using StudentManagementPortal.Constants;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Repositories.Interfaces;
using StudentManagementPortal.Services.Interfaces;
using System.Security.Claims;
using static StudentManagementPortal.Constants.Const;

namespace StudentManagementPortal.Services
{
    public class LoggerService : ILoggerService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IHttpContextAccessor httpContextAccessor;

        public LoggerService(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
        {
            this.unitOfWork = unitOfWork;
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<LogInfo> CreateAsync(User user, bool isSignIn)
        {
            var newLogInfo = new LogInfo();
            if (isSignIn)
            {
                newLogInfo.Type = LogType.SIGN_IN;
                newLogInfo.Detail = $"User with email {user.Email} logged-in!";
            }
            else
            {
                LogInfo logInfo = await unitOfWork.LoggerRepository.GetByLastPasswordFail(user.Id);

                if (logInfo == null)
                {
                    newLogInfo.Type = LogType.PASSWORDFAIL_1;
                }
                else
                {

                    switch (logInfo.Type)
                    {
                        case LogType.PASSWORDFAIL_1:
                            newLogInfo.Type = LogType.PASSWORDFAIL_2;
                            break;

                        case LogType.PASSWORDFAIL_2:
                            newLogInfo.Type = LogType.PASSWORDFAIL_3;
                            break;
                        case LogType.PASSWORDFAIL_3:
                            newLogInfo.Type = LogType.PASSWORDFAIL_1;
                            break;
                        default:
                            newLogInfo.Type = LogType.PASSWORDFAIL_1;
                            break;
                    }
                    //var attemptIndex = Convert.ToInt32(logInfo.Type.IndexOf('-')) + 1;
                    //var attemptCount = Convert.ToInt32(logInfo.Type.Substring(attemptIndex)) + 1;
                    //newLogInfo.Type = $"{logInfo.Type.Substring(0, attemptIndex)}{attemptCount}";
                }
                newLogInfo.Detail = $"Password fail-attempt by user with Id {user.Id} {(user.Role == Role.STUDENT ? $"& EnrollmentId as {((Student)user).EnrollmentId}" : $"")}";
            }

            newLogInfo.LogTime = DateTime.Now;
            newLogInfo.UserId = user.Id;
            return await unitOfWork.LoggerRepository.CreateAsync(newLogInfo);
        }

        public async Task<LogInfo> CreateUpdateLogAsync(string actionOn, object actionData)
        {
            var newLogInfo = new LogInfo();

            if (actionOn == ActionOn.STUDENT_PROFILE)
            {
                var logBy = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);
                var student = (Student)actionData;
                newLogInfo.Detail = $"{actionOn} updated for student with userId {student.Id} {(logBy == Role.STUDENT ? $"by self" : $"by admin")}.";
                newLogInfo.UserId = student.Id;

            }
            else if (actionOn == ActionOn.RESULT)
            {
                var result = (Result)actionData;
                newLogInfo.Detail = $"{actionOn} updated with ResultId as {result.Id} & studentId as {result.StudentId} by admin.";
                newLogInfo.UserId = Convert.ToInt32(httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Sid));
            }


            newLogInfo.Type = LogType.UPDATE;
            newLogInfo.LogTime = DateTime.Now;

            return newLogInfo;
        }

        public async Task<LogInfo> CreateDeleteLogAsync(string actionOn, object actionData)
        {
            var newLogInfo = new LogInfo();

            if (actionOn == ActionOn.STUDENT)
            {
                var logBy = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);
                var student = (Student)actionData;
                newLogInfo.Detail = $"{actionOn} deleted with enrollmentId as {student.EnrollmentId} by admin.";
                newLogInfo.UserId = Convert.ToInt32(httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Sid));
            }
            else if (actionOn == ActionOn.RESULT)
            {
                var result = (Result)actionData;
                newLogInfo.Detail = $"{actionOn} deleted with ResultId as {result.Id} & studentId as {result.StudentId} by admin.";
                newLogInfo.UserId = Convert.ToInt32(httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Sid));
            }

            newLogInfo.Type = LogType.UPDATE;
            newLogInfo.LogTime = DateTime.Now;

            return newLogInfo;
        }

        public async Task<LogInfo> CreateStatusUpdateLogAsync(string actionOn, object actionData)
        {
            var newLogInfo = new LogInfo();

            var logBy = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);
            var student = (Student)actionData;
            newLogInfo.Detail = $"{actionOn} status updated to for student with userId {student.Id} {(logBy == Role.ADMIN ? $"by admin" : $"")}.";
            newLogInfo.UserId = student.Id;

            newLogInfo.Type = LogType.UPDATE;
            newLogInfo.LogTime = DateTime.Now;

            return newLogInfo;
        }
    }
}
