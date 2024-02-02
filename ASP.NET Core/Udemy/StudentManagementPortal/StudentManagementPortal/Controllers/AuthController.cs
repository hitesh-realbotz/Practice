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

        public AuthController(IUserRepository userRepository, IMapper mapper, ITokenHandler tokenHandler)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
            this.tokenHandler = tokenHandler;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] AddUserRequestDto addUserRequestDto)
        {
            var user = await userRepository.FindByEmailAsync(addUserRequestDto.Email);

            if (user != null)
            {
                if (user.Student.EnrollmentId == addUserRequestDto.EnrollmentId)
                {
                    ModelState.AddModelError(nameof(addUserRequestDto.EnrollmentId), $"{user.Student.EnrollmentId} {nameof(addUserRequestDto.EnrollmentId)} already registered. Please Register with another EnrollmentId.");
                }
                ModelState.AddModelError(nameof(addUserRequestDto.Email), $"{user.Email} {nameof(addUserRequestDto.Email)} already registered. Please Register with another emailId.");
                return Conflict(ModelState);
                //return Conflict(new { Message = "Email already exists!" });
            }
            var userDomainModel = new User()
            {
                Name = addUserRequestDto.Name,
                Email = addUserRequestDto.Email,
                HashPassword = GetHashedPassword(addUserRequestDto.Password),
                //Role = addUserRequestDto.Role,
                Role = "Student",
                Status = "Active",
                Student = new Student()
                {
                    EnrollmentId = addUserRequestDto.EnrollmentId,
                    MobNumber = addUserRequestDto.MobNumber,
                    ImageUrl = addUserRequestDto.ImageUrl,
                }
            };

            userDomainModel = await userRepository.CreateAsync(userDomainModel);

            var userDto = mapper.Map<UserDto>(userDomainModel);
            return Ok(userDto);

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
            if (user == null )
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
