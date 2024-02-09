using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories.Interfaces;
using StudentManagementPortal.Services.Interfaces;
using System.Net;
using System.Security.Claims;

namespace StudentManagementPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {

        private readonly IMapper mapper;
        private readonly IStudentService studentService;

        public StudentsController(IMapper mapper, IStudentService studentService)
        {
            this.mapper = mapper;
            this.studentService = studentService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var studentList = await studentService.GetAllAsync();
            var studentListDto = mapper.Map<List<StudentProfileDto>>(studentList);
            return Ok(studentListDto);
        }

        [HttpGet]
        [Route("{enrollmentId:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetStudentProfile([FromRoute] int enrollmentId)
        {
            var student = await studentService.GetStudentByEnrollmentIdAsync(enrollmentId);

            var studentProfileDto = mapper.Map<StudentProfileDto>(student);
            return Ok(studentProfileDto);
        }


        [HttpGet]
        [Route("ByLoggedUser")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetByLoggedUser()
        {
            int enrollmentId = Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.SerialNumber));
            var student = await studentService.GetStudentByEnrollmentIdAsync(enrollmentId);

            var studentProfileDto = mapper.Map<StudentProfileDto>(student);
            return Ok(studentProfileDto);
        }


        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateStudentProfile([FromBody] StudentProfileDto studentProfileDto)
        {
            var student = mapper.Map<Student>(studentProfileDto);
            student = await studentService.UpdateAsync(studentProfileDto);

            return Ok(mapper.Map<StudentProfileDto>(student));
        }


        [HttpDelete]
        [Route("{enrollmentId:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] int enrollmentId)
        {
            var deletedStudent = await studentService.DeleteAsync(enrollmentId);
            return Ok(mapper.Map<StudentProfileDto>(deletedStudent));
        }
    }
}
