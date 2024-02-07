using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories.Interfaces;
using System.Net;
using System.Security.Claims;

namespace StudentManagementPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepository studentRepository;
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public StudentsController(IStudentRepository studentRepository, IUserRepository userRepository, IMapper mapper)
        {
            this.studentRepository = studentRepository;
            this.userRepository = userRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var studentList = await studentRepository.GetAllAsync();
            var studentListDto = mapper.Map<List<StudentProfileDto>>(studentList);
            return Ok(studentListDto);
        }

        [HttpGet]
        [Route("{enrollmentId:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetStudentProfile([FromRoute] int enrollmentId)
        {
            var studentDomainModel = await studentRepository.GetStudentByEnrollmentIdAsync(enrollmentId);
            if (studentDomainModel != null)
            {
                studentDomainModel.HashPassword = null;
                var studentProfileDto = mapper.Map<StudentProfileDto>(studentDomainModel);
                return Ok(studentProfileDto);
            }

            return NotFound(new ApiErrorResponse(HttpStatusCode.NotFound, "Student with Id not found"));
        }


        [HttpGet]
        [Route("ByLoggedUser")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetByLoggedUser()
        {
            int enrollmentId = Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.SerialNumber));
            var studentDomainModel = await studentRepository.GetStudentByEnrollmentIdAsync(enrollmentId);
            if (studentDomainModel != null)
            {
                studentDomainModel.HashPassword = null;
                var studentProfileDto = mapper.Map<StudentProfileDto>(studentDomainModel);
                return Ok(studentProfileDto);
            }

            return NotFound(new ApiErrorResponse(HttpStatusCode.NotFound, "Student with Id not found"));
        }


        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateStudentProfile([FromBody] StudentProfileDto studentProfileDto)
        {
            var studentDomainModel = mapper.Map<Student>(studentProfileDto);
            studentDomainModel = await studentRepository.UpdateAsync(studentDomainModel);

            return Ok(mapper.Map<StudentProfileDto>(studentDomainModel));
        }


        [HttpDelete]
        [Route("{enrollmentId:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] int enrollmentId)
        {
            var deletedStudent = await studentRepository.DeleteAsync(enrollmentId);
            if (deletedStudent != null)
            {
                return Ok(mapper.Map<StudentProfileDto>(deletedStudent));
            }
            return NotFound(new ApiErrorResponse(HttpStatusCode.NotFound, "Student with Id not found"));
        }
    }
}
