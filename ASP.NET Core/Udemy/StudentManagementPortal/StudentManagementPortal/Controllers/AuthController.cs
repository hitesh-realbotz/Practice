using AutoMapper;
using EntityFramework.Exceptions.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories.Interfaces;
using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace StudentManagementPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;
        private readonly ITokenHandler tokenHandler;
        private readonly IStudentRepository studentRepository;
        private readonly IAdminRepository adminRepository;
        private readonly IConfiguration configuration;

        public AuthController(IUserRepository userRepository, IMapper mapper, ITokenHandler tokenHandler, IStudentRepository studentRepository, IAdminRepository adminRepository, IConfiguration configuration)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
            this.tokenHandler = tokenHandler;
            this.studentRepository = studentRepository;
            this.adminRepository = adminRepository;
            this.configuration = configuration;
        }

        //[HttpPost]
        //[Route("RegisterUser")]
        //public async Task<IActionResult> Register([FromBody] AddUserRequestDto addUserRequestDto)
        //{
        //    //var user = await userRepository.FindByEmailAsync(addUserRequestDto.Email);

        //    //if (user != null)
        //    //{
        //    //    ModelState.AddModelError(nameof(addUserRequestDto.Email), $"{user.Email} {nameof(addUserRequestDto.Email)} already registered. Please Register with another emailId.");
        //    //    return Conflict(ModelState);
        //    //    //return Conflict(new { Message = "Email already exists!" });
        //    //}

        //    //if (addUserRequestDto.Role == "Student")
        //    //{
        //    //    if (addUserRequestDto.EnrollmentId != null && await IsEnrollmentIdRegistered(addUserRequestDto))
        //    //    {
        //    //        return Conflict(ModelState);
        //    //    }
        //    //    Student student = new Student()
        //    //    {
        //    //        Name = addUserRequestDto.Name,
        //    //        Email = addUserRequestDto.Email,
        //    //        HashPassword = GetHashedPassword(addUserRequestDto.Password),
        //    //        Role = addUserRequestDto.Role,
        //    //        Status = "Active",
        //    //        EnrollmentId = (int)addUserRequestDto.EnrollmentId,
        //    //        MobNumber = addUserRequestDto.MobNumber,
        //    //        ImageUrl = addUserRequestDto.ImageUrl,
        //    //    };
        //    //    student = await studentRepository.CreateAsync(student);
        //    //    return Ok(mapper.Map<StudentDto>(student));
        //    //}
        //    //else
        //    //{
        //    //    Admin admin = new Admin()
        //    //    {
        //    //        Name = addUserRequestDto.Name,
        //    //        Email = addUserRequestDto.Email,
        //    //        HashPassword = GetHashedPassword(addUserRequestDto.Password),
        //    //        Role = addUserRequestDto.Role,
        //    //        Status = "Active",
        //    //        Level = addUserRequestDto.Level
        //    //    };
        //    //    admin = await adminRepository.CreateAsync(admin);
        //    //    return Ok(mapper.Map<AdminDto>(admin));
        //    //}

        //    try
        //    {
        //        if (addUserRequestDto.Role == "Student")
        //        {
        //            Student student = new Student()
        //            {
        //                Name = addUserRequestDto.Name,
        //                Email = addUserRequestDto.Email,
        //                HashPassword = GetHashedPassword(addUserRequestDto.Password),
        //                Role = addUserRequestDto.Role,
        //                Status = "Active",
        //                EnrollmentId = (int)addUserRequestDto.EnrollmentId,
        //                MobNumber = addUserRequestDto.MobNumber,
        //                ImageUrl = addUserRequestDto.ImageUrl,
        //            };
        //            student = await studentRepository.CreateAsync(student);
        //            return Ok(mapper.Map<StudentDto>(student));
        //        }
        //        else
        //        {
        //            Admin admin = new Admin()
        //            {
        //                Name = addUserRequestDto.Name,
        //                Email = addUserRequestDto.Email,
        //                HashPassword = GetHashedPassword(addUserRequestDto.Password),
        //                Role = addUserRequestDto.Role,
        //                Status = "Active",
        //                Level = addUserRequestDto.Level
        //            };
        //            admin = await adminRepository.CreateAsync(admin);
        //            return Ok(mapper.Map<AdminDto>(admin));
        //        }
        //    }
        //    catch (DbUpdateException ex)
        //    {

        //        var message = new StringBuilder();
        //        foreach (var entry in ex.Entries)
        //        {
        //            foreach (var property in entry.Properties)
        //            {
        //                var tableName = property.Metadata.DeclaringType.Name;
        //                tableName = tableName.Substring(tableName.LastIndexOf('.') + 1);

        //                if (ex.InnerException.Message.Contains(property.Metadata.Name) &&
        //                    ex.InnerException.Message.Contains(tableName))
        //                {
        //                    message.AppendLine($"{property.Metadata.Name} alredy registered. Please register with another {property.Metadata.Name}.");
        //                }
        //            }
        //        }
        //        return Conflict(new { exMsg = message.ToString() });
        //    }
        //}


        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] AddStudentRequestDto addStudentRequestDto)
        {
            try
            {
                Student student = new Student()
                {
                    Name = addStudentRequestDto.Name,
                    Email = addStudentRequestDto.Email,
                    HashPassword = GetHashedPassword(addStudentRequestDto.Password, configuration["Jwt:SaltOptions"], Convert.ToInt32(configuration["Jwt:SaltLength"])),
                    Role = "Student",
                    Status = "Active",
                    EnrollmentId = (int)addStudentRequestDto.EnrollmentId,
                    MobNumber = addStudentRequestDto.MobNumber,
                    ImageUrl = addStudentRequestDto.ImageUrl,
                };
                student = await studentRepository.CreateAsync(student);
                return Ok(mapper.Map<StudentDto>(student));
            }
            catch (DbUpdateException ex)
            {
                var message = new StringBuilder();
                foreach (var entry in ex.Entries)
                {
                    foreach (var property in entry.Properties)
                    {
                        var tableName = property.Metadata.DeclaringType.Name;
                        tableName = tableName.Substring(tableName.LastIndexOf('.') + 1);

                        if (ex.InnerException.Message.Contains(property.Metadata.Name) &&
                            ex.InnerException.Message.Contains(tableName))
                        {
                            message.AppendLine($"{property.Metadata.Name} alredy registered. Please register with another {property.Metadata.Name}.");
                        }
                    }
                }
                return Conflict(new { exMsg = message.ToString() });
            }
        }

        private async Task<bool> IsEnrollmentIdRegistered(AddUserRequestDto addUserRequestDto)
        {
            var student = await studentRepository.GetStudentByEnrollmentIdAsync((int)addUserRequestDto.EnrollmentId);
            if (student == null)
            {
                return false;
            }
            if (student.EnrollmentId == addUserRequestDto.EnrollmentId)
            {
                ModelState.AddModelError(nameof(addUserRequestDto.EnrollmentId), $"{student.EnrollmentId} {nameof(addUserRequestDto.EnrollmentId)} already registered. Please Register with another EnrollmentId.");
                return true;
            }
            return false;
        }


        private static string GetHashedPassword(string password, string saltOptions, int saltLength)
        {
            using (var sha256 = SHA256.Create())
            {
                //var saltLength = Convert.ToInt32(saltLength);
                var salt = new StringBuilder();
                for (int i = 0; i < saltLength; i++)
                {
                    salt.Append(saltOptions.Substring(new Random().Next(0, 61), 1));
                }
                var saltString = salt.ToString();
                password = password + saltString;

                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return (string)(BitConverter.ToString(hashedBytes).Replace("-", "").ToLower()) + saltString;
            }
        }
        private static bool VerifyHashedPassword(string password, string userHashedPass, int saltLength)
        {
            using (var sha256 = SHA256.Create())
            {
                string saltString = userHashedPass.Substring(userHashedPass.Length - saltLength);
                password = password + saltString;
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

                var hashTobeValidated = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower() + saltString;
                return (hashTobeValidated.Equals(userHashedPass)) ? true : false;
            }
        }


        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto)
        {
            var user = await userRepository.FindByEmailAsync(loginRequestDto.Email);
            if (user == null)
            {
                return BadRequest("Email incorrect");
            }
            if (user.Status == "Active")
            {
                var isValid = VerifyHashedPassword(loginRequestDto.Password, user.HashPassword, Convert.ToInt32(configuration["Jwt:SaltLength"]));
                if (isValid)
                {
                    //Generate Token
                    var token = tokenHandler.CreateJWTToken(user);
                    return Ok(token);
                }
                else
                {
                    LogInfo logInfo = new LogInfo();
                    return BadRequest("Password incorrect");
                }
            }
            return StatusCode((int)HttpStatusCode.Locked, new { message = "User is Locked!" });
        }

    }
}
