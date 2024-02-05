using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;

namespace StudentManagementPortal.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> CreateAsync(User user);
        Task<User?> FindByEmailAsync(string email);
        //Task<User?> FindByStudentIdAsync(int studentId);
        //Task<StudentProfileDto?> UpdateAsync(StudentProfileDto studentProfileDto);
    }
}
