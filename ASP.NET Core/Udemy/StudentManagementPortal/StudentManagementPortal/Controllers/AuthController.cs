using AutoMapper;
using EntityFramework.Exceptions.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementPortal.CustomeActionFilter;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories.Interfaces;
using StudentManagementPortal.Services.Interfaces;
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
        private readonly IAuthRepository authRepository;
        private readonly IImageRepository imageRepository;

        private readonly IStudentService studentService;

        public AuthController(IUserRepository userRepository, IMapper mapper, IAuthRepository authRepository, IImageRepository imageRepository, IStudentService studentService)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
            this.authRepository = authRepository;
            this.imageRepository = imageRepository;
            this.studentService = studentService;
        }




        [HttpPost]
        [Route("Register")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Register([FromForm] AddStudentRequestDto addStudentRequestDto)
        {

            var student = await studentService.CreateAsync(addStudentRequestDto);
            if (student == null)
            {
                throw new Exception();
            }
            return Ok(mapper.Map<Student>(student));
        }


        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> Download([FromRoute] int id)
        {
            var image = await imageRepository.GetByIdAsync(id);
            if (image != null)
            {
                var filecontentResult = new FileContentResult(image.Data, "application/octet-stream")
                {
                    FileDownloadName = image.Name
                };

                return filecontentResult;                   //To return downloadable file
                //return File(image.Data, "image/jpeg");    //To return file content view
            }
            return BadRequest(new ApiErrorResponse(HttpStatusCode.BadRequest, "Image Not Found!"));
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
