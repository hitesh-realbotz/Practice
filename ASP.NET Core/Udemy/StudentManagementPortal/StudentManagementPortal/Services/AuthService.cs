using Microsoft.IdentityModel.Tokens;
using StudentManagementPortal.Constants;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories.Interfaces;
using StudentManagementPortal.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using static StudentManagementPortal.Constants.Const;

namespace StudentManagementPortal.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration configuration;
        private readonly IUnitOfWork unitOfWork;
        private readonly ILoggerService loggerService;

        public AuthService(IConfiguration configuration, IUnitOfWork unitOfWork, ILoggerService loggerService)
        {
            this.configuration = configuration;
            this.unitOfWork = unitOfWork;
            this.loggerService = loggerService;
        }
        public string GetSalt()
        {
            using (var sha256 = SHA256.Create())
            {
                var saltLength = Convert.ToInt32(configuration["Jwt:SaltLength"]);
                var saltOptions = configuration["Jwt:SaltOptions"];
                var salt = new StringBuilder();
                for (int i = 0; i < saltLength; i++)
                {
                    salt.Append(saltOptions.Substring(new Random().Next(0, 61), 1));
                }
                return salt.ToString();
            }
        }

        public string GetHashedPassword(string password, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                password = password + salt;
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }

        public bool VerifyHashedPassword(string password, string userHashedPass, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                password = password + salt;
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

                var hashTobeValidated = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
                return (hashTobeValidated.Equals(userHashedPass)) ? true : false;
            }
        }

        public string CreateJWTToken(User user)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Email, user.Email));
            if (user.Role == Role.STUDENT)
            {
                Student student = (Student)user;
                claims.Add(new Claim(ClaimTypes.SerialNumber, student.EnrollmentId.ToString()));
            }
            claims.Add(new Claim(ClaimTypes.Sid, user.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Role, user.Role.ToString()));
            claims.Add(new Claim(ClaimTypes.Name, user.Name));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(Convert.ToInt32(configuration["Jwt:ExpireTime"])),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<string?> AuthenticateUserAsync(LoginRequestDto loginRequestDto)
        {
            var user = await unitOfWork.UserRepository.FindByEmailAsync(loginRequestDto.Email);
            if (user == null)
            {
                throw new BadHttpRequestException($"Provided {loginRequestDto.Email} email-id is incorrect!");
            }
            if (user.Status == Status.ACTIVE)
            {
                var isValid = this.VerifyHashedPassword(loginRequestDto.Password, user.HashPassword, user.Salt);
                if (isValid)
                {
                    //Generate Token
                    var token = this.CreateJWTToken(user);
                    if (token != null)
                    {
                        await loggerService.CreateAsync(user, true);
                    }
                    return token;
                }
                else
                {
                    LogInfo logInfo = await loggerService.CreateAsync(user);
                    if (logInfo.Type == LogType.PASSWORDFAIL_3 && user.Role == Const.Role.STUDENT)
                    {
                        user = await unitOfWork.StudentRepository.UpdateStatusAsync(((Student)user).EnrollmentId, Status.LOCKED);
                        var log = await loggerService.CreateStatusUpdateLogAsync(Const.ActionOn.STUDENT_PROFILE, (Student)user);
                        await unitOfWork.LoggerRepository.CreateAsync(log);

                    }
                    throw new BadHttpRequestException($"{(user.Status == Status.LOCKED ? $"Your Account Locked! Contact to Admin to get access." : $"")} Provided {loginRequestDto.Password} Password is Incorrect! " +
                        $"{(user.Role == Role.STUDENT ? $"{logInfo.Type} of 3 attempts!!!" : $"")}");
                }
            }
            throw new BadHttpRequestException($"Your Account Locked! Contact to Admin to get access.");
        }
    }
}
