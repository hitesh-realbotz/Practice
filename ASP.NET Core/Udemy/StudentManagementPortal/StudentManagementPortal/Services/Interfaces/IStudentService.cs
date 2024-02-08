using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;

namespace StudentManagementPortal.Services.Interfaces
{
    public interface IStudentService
    {
        public Task<Student?> CreateAsync(AddStudentRequestDto addStudentRequestDto);
    }
}
