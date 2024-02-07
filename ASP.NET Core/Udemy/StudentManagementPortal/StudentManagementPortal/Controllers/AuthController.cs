using AutoMapper;
using EntityFramework.Exceptions.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementPortal.CustomeActionFilter;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.Data.Common;
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
        private readonly IStudentRepository studentRepository;
        private readonly IAdminRepository adminRepository;
        private readonly IConfiguration configuration;
        private readonly IAuthRepository authRepository;

        public AuthController(IUserRepository userRepository, IMapper mapper, IStudentRepository studentRepository, IAdminRepository adminRepository, IConfiguration configuration, IAuthRepository authRepository)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
            this.studentRepository = studentRepository;
            this.adminRepository = adminRepository;
            this.configuration = configuration;
            this.authRepository = authRepository;
        }




        [HttpPost]
        [Route("Register")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Register([FromBody] AddStudentRequestDto addStudentRequestDto)
        {
            Student student = new Student()
            {
                Name = addStudentRequestDto.Name,
                Email = addStudentRequestDto.Email,
                HashPassword = authRepository.GetHashedPassword(addStudentRequestDto.Password),
                Role = "Student",
                Status = "Active",
                EnrollmentId = addStudentRequestDto.EnrollmentId,
                MobNumber = addStudentRequestDto.MobNumber,
                ImageUrl = addStudentRequestDto.ImageUrl,
            };
            student = await studentRepository.CreateAsync(student);
            return Ok(mapper.Map<StudentDto>(student));
        }



        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto)
        {
            var user = await userRepository.FindByEmailAsync(loginRequestDto.Email);
            if (user == null)
            {
                return NotFound(new ApiErrorResponse(HttpStatusCode.NotFound, "Email incorrect!"));
            }
            if (user.Status == "Active")
            {
                var isValid = authRepository.VerifyHashedPassword(loginRequestDto.Password, user.HashPassword);
                if (isValid)
                {
                    //Generate Token
                    var token = authRepository.CreateJWTToken(user);
                    return Ok(new ApiErrorResponse(HttpStatusCode.OK, token));
                }
                else
                {
                    LogInfo logInfo = new LogInfo();
                    return NotFound(new ApiErrorResponse(HttpStatusCode.NotFound, "Password Incorrect!"));
                }
            }
            return BadRequest(new ApiErrorResponse(HttpStatusCode.Locked, "User is Locked!"));
        }

    }
}
