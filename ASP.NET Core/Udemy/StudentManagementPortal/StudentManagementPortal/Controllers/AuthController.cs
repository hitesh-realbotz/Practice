using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public AuthController(IUserRepository userRepository, IMapper mapper, ITokenHandler tokenHandler, IStudentRepository studentRepository, IAdminRepository adminRepository)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
            this.tokenHandler = tokenHandler;
            this.studentRepository = studentRepository;
            this.adminRepository = adminRepository;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] AddUserRequestDto addUserRequestDto)
        {
            var user = await userRepository.FindByEmailAsync(addUserRequestDto.Email);

            if (user != null)
            {
                ModelState.AddModelError(nameof(addUserRequestDto.Email), $"{user.Email} {nameof(addUserRequestDto.Email)} already registered. Please Register with another emailId.");
                return Conflict(ModelState);
                //return Conflict(new { Message = "Email already exists!" });
            }

            if (addUserRequestDto.Role == "Student")
            {
                if (addUserRequestDto.EnrollmentId != null && await IsEnrollmentIdRegistered(addUserRequestDto))
                {
                    return Conflict(ModelState);
                }
                Student student = new Student()
                {
                    Name = addUserRequestDto.Name,
                    Email = addUserRequestDto.Email,
                    HashPassword = GetHashedPassword(addUserRequestDto.Password),
                    Role = addUserRequestDto.Role,
                    Status = "Active",
                    EnrollmentId = (int)addUserRequestDto.EnrollmentId,
                    MobNumber = addUserRequestDto.MobNumber,
                    ImageUrl = addUserRequestDto.ImageUrl,
                };
                student = await studentRepository.CreateAsync(student);
                return Ok(mapper.Map<StudentDto>(student));
            }
            else
            {
                Admin admin = new Admin()
                {
                    Name = addUserRequestDto.Name,
                    Email = addUserRequestDto.Email,
                    HashPassword = GetHashedPassword(addUserRequestDto.Password),
                    Role = addUserRequestDto.Role,
                    Status = "Active",
                    Level = addUserRequestDto.Level
                };
                admin = await adminRepository.CreateAsync(admin);
                return Ok(mapper.Map<AdminDto>(admin));
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


        private static string GetHashedPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }
        private static bool VerifyHashedPassword(string password, string userHashedPass)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

                var hashTobeValidated = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();

                return (hashTobeValidated.Equals(userHashedPass)) ? true : false;
            }
        }



        [HttpPost]
        [Route("{password}")]
        public async Task<IActionResult> VerifyPassword([FromRoute] string password)
        {
            var msg = VerifyHashedPassword(password, "f312795e322c87461a6f3c49e09897c59ca0d5a36245d2a00f08cbc66eee976d");
            return Ok(msg);
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
                var isValid = VerifyHashedPassword(loginRequestDto.Password, user.HashPassword);
                if (isValid)
                {
                    //Generate Token
                    var token = tokenHandler.CreateJWTToken(user);
                    return Ok(token);
                }
                else
                {
                    //Log Entry
                    return BadRequest("Password incorrect");
                }
            }
            return StatusCode((int)HttpStatusCode.Locked, new { message = "User is Locked!" });
        }

    }
}
