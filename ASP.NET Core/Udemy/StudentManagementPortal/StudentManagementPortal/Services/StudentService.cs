using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories;
using StudentManagementPortal.Repositories.Interfaces;
using StudentManagementPortal.Services.Interfaces;
using System.Net;

namespace StudentManagementPortal.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository studentRepository;
        private readonly IImageRepository imageRepository;
        private readonly IAuthRepository authRepository;

        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;

        public StudentService(IStudentRepository studentRepository, IImageRepository imageRepository, IAuthRepository authRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            this.studentRepository = studentRepository;
            this.imageRepository = imageRepository;
            this.authRepository = authRepository;

            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<Student?> CreateAsync(AddStudentRequestDto addStudentRequestDto)
        {
            Student student = new Student()
            {
                Name = addStudentRequestDto.Name,
                Email = addStudentRequestDto.Email,
                HashPassword = authRepository.GetHashedPassword(addStudentRequestDto.Password),
                Role = "Student",
                Status = "Active",
                EnrollmentId = addStudentRequestDto.EnrollmentId,
                MobNumber = addStudentRequestDto.MobNumber.IsNullOrEmpty() ? null : addStudentRequestDto.MobNumber
            };

            student = await studentRepository.CreateAsync(student);
            if (student == null)
            {
                throw new BadHttpRequestException("Student not registered!");
            }
            var image = await imageRepository.UploadAsync(addStudentRequestDto.File, student);
            if (image == null)
            {
                throw new BadHttpRequestException("Student registered but image not saved. Please re-upload image by updating profile!");
            }
            var urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}/api/Images/{image.StudentId}";
            student.ImageUrl = urlFilePath;
            student = await studentRepository.UpdateAsync(student);

            return student;

        }

        public async Task<Student?> DeleteAsync(int enrollmentId)
        {
            var deletedStudent = await studentRepository.DeleteAsync(enrollmentId);
            if (deletedStudent == null)
            {
                throw new BadHttpRequestException($"Student with {enrollmentId} enrollmentId not found!");
            }
            return deletedStudent;
        }

        public async Task<List<Student>> GetAllAsync()
        {
            return await studentRepository.GetAllAsync();
        }

        public async Task<Student> GetStudentByEnrollmentIdAsync(int enrollmentId)
        {
            var student = await studentRepository.GetStudentByEnrollmentIdAsync(enrollmentId);
            if (student == null)
            {
                throw new BadHttpRequestException($"Student with {enrollmentId} enrollmentId not found!");
            }
            student.HashPassword = null;

            return student;


        }

        public async Task<Student> UpdateAsync(StudentProfileDto studentProfileDto)
        {
            var student = mapper.Map<Student>(studentProfileDto);
            student = await studentRepository.UpdateAsync(student);
            if (student == null)
            {
                throw new BadHttpRequestException($"Student with {studentProfileDto.EnrollmentId} enrollmentId not found!");
            }

            student.HashPassword = null;

            return student;
        }
    }
}
