using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories.Interfaces;

namespace StudentManagementPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepository studentRepository;
        private readonly IUserRepository userRepository;

        public StudentsController(IStudentRepository studentRepository, IUserRepository userRepository)
        {
            this.studentRepository = studentRepository;
            this.userRepository = userRepository;
        }
        [HttpGet]
        [Route("{enrollmentId:int}")]
        public async Task<IActionResult> GetStudentProfile([FromRoute] int enrollmentId)
        {
            var studentDomainModel = await studentRepository.GetStudentByEnrollmentIdAsync(enrollmentId);
            if (studentDomainModel != null)
            {
                var userDomainModel = await userRepository.FindByStudentIdAsync(studentDomainModel.Id);
                var studentProfileDto = new StudentProfileDto()
                {
                    EnrollmentId = studentDomainModel.EnrollmentId,
                    StudentId = studentDomainModel.Id,
                    ImageUrl = studentDomainModel.ImageUrl,
                    MobNumber = studentDomainModel.MobNumber,
                    UserId = userDomainModel.Id,
                    Name = userDomainModel.Name,
                    Email = userDomainModel.Email,
                    Password = null,
                    Role = userDomainModel.Role,
                    Status = userDomainModel.Status
                };

                return Ok(studentProfileDto);

            }
            return BadRequest(new { Message = "Student with Id not found" });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateStudentProfile([FromBody] StudentProfileDto studentProfileDto)
        {
            var updatedStudentProfileDto = await userRepository.UpdateAsync(studentProfileDto);
            return Ok(updatedStudentProfileDto);
        }
    }
}
