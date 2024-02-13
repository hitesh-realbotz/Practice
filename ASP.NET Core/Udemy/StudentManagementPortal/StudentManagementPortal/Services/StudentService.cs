using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StudentManagementPortal.Constants;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories.Interfaces;
using StudentManagementPortal.Services.Interfaces;
using System.Net;
using System.Security.Claims;

namespace StudentManagementPortal.Services
{
    public class StudentService : IStudentService
    {
        private readonly IAuthService authService;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IUnitOfWork unitOfWork;
        private readonly ILoggerService loggerService;

        public StudentService(IAuthService authService, IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork, ILoggerService loggerService)
        {

            this.authService = authService;
            this.httpContextAccessor = httpContextAccessor;
            this.unitOfWork = unitOfWork;
            this.loggerService = loggerService;
        }
        public async Task<Student?> CreateAsync(AddStudentRequestDto addStudentRequestDto)
        {
            var salt = authService.GetSalt();
            Student student = new Student()
            {
                Name = addStudentRequestDto.Name,
                Email = addStudentRequestDto.Email,
                Salt = salt,
                HashPassword = authService.GetHashedPassword(addStudentRequestDto.Password, salt),
                Role = Const.Role.STUDENT,
                Status = Const.Status.ACTIVE,
                File = addStudentRequestDto.File,
                EnrollmentId = addStudentRequestDto.EnrollmentId,
                MobNumber = addStudentRequestDto.MobNumber.IsNullOrEmpty() ? null : addStudentRequestDto.MobNumber
            };

            unitOfWork.BeginTransaction();
            try
            {
                student = await unitOfWork.StudentRepository.CreateAsync(student);
                if (student.File != null && student.File.Length > 0)
                {
                    var image = await unitOfWork.ImageRepository.UploadAsync(addStudentRequestDto.File, student.Id);
                    var urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}/api/Images/{image.StudentId}";
                    student.ImageUrl = urlFilePath;
                    student = await unitOfWork.StudentRepository.UpdateAsync(student);
                }
                unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                unitOfWork.Rollback();

                throw ex;
            }
            return student;
        }


        public async Task<List<Student>> GetAllAsync()
        {
            var studentList = await unitOfWork.StudentRepository.GetAllAsync();
            if (studentList == null)
            {
                throw new BadHttpRequestException($"Students are yet to register!");
            }
            return studentList;
        }

        public async Task<Student> GetStudentByEnrollmentIdAsync(int enrollmentId)
        {
            var student = await unitOfWork.StudentRepository.GetStudentByEnrollmentIdAsync(enrollmentId);
            if (student == null)
            {
                throw new BadHttpRequestException($"Student with {enrollmentId} enrollmentId not found!");
            }
            return student;
        }

        public async Task<Student> UpdateAsync(Student student)
        {
            bool isStudent = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role) == Const.Role.STUDENT ? true : false;
            if (isStudent)
            {
                student.EnrollmentId = Convert.ToInt32(httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.SerialNumber));
                student.Id = Convert.ToInt32(httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Sid));
            }
            else
            {
                var existingStudent = await unitOfWork.StudentRepository.GetStudentByEnrollmentIdAsync(student.EnrollmentId);
                if (existingStudent == null)
                {
                    throw new BadHttpRequestException($"Student with {student.EnrollmentId} enrollmentId not found!");
                }
                student.Id = existingStudent.Id;
            }

            unitOfWork.BeginTransaction();
            try
            {
                if (student.File != null && student.File.Length > 0)
                {
                    var image = await unitOfWork.ImageRepository.UpdateAsync(student.File, student.Id);
                    student.ImageUrl = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}/api/Images/{image.StudentId}";
                }

                student = await unitOfWork.StudentRepository.UpdateAsync(student, isStudent);
                if (student == null)
                {
                    throw new BadHttpRequestException($"Student with {student.EnrollmentId} enrollmentId not found!");
                }

                var log = await loggerService.CreateUpdateLogAsync(Const.ActionOn.STUDENT_PROFILE, student);
                await unitOfWork.LoggerRepository.CreateAsync(log);

                unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                unitOfWork.Rollback();
                throw ex;
            }
            return student;

        }


        public async Task<Student?> DeleteAsync(int enrollmentId)
        {
            unitOfWork.BeginTransaction();
            try
            {
                var deletedStudent = await unitOfWork.StudentRepository.DeleteAsync(enrollmentId);
                if (deletedStudent == null)
                {
                    throw new BadHttpRequestException($"Student with {enrollmentId} enrollmentId not found!");
                }
                var log = await loggerService.CreateDeleteLogAsync(Const.ActionOn.STUDENT, deletedStudent);
                await unitOfWork.LoggerRepository.CreateAsync(log);

                unitOfWork.Commit();
                return deletedStudent;
            }
            catch (Exception ex)
            {
                unitOfWork.Rollback();
                throw ex;
            }

        }



    }
}
