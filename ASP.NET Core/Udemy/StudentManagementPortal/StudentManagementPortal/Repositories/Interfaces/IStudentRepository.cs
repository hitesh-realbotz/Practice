using StudentManagementPortal.Models.Domain;

namespace StudentManagementPortal.Repositories.Interfaces
{
    public interface IStudentRepository
    {
        Task<Student?> CreateAsync(Student student);
        Task<Student?> GetStudentByEnrollmentIdAsync(int enrollmentId);
        Task<Student?> UpdateAsync(Student student, bool isStudent = true);
        Task<Student?> UpdateStatusAsync(int enrollmentId, string status);

        Task<List<Student>> GetAllAsync();
        Task<Student?> DeleteAsync(int enrollmentId);
    }
}
