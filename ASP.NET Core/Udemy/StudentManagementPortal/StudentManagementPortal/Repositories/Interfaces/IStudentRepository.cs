using StudentManagementPortal.Models.Domain;

namespace StudentManagementPortal.Repositories.Interfaces
{
    public interface IStudentRepository
    {
        Task<Student?> GetStudentByEnrollmentIdAsync(int enrollmentId);
    }
}
