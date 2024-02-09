using StudentManagementPortal.Models.Domain;

namespace StudentManagementPortal.Repositories.Interfaces
{
    public interface IImageRepository
    {
        Task<Image?> UploadAsync(IFormFile file, Student student);
        Task<Image?> GetByIdAsync(int id);
        Task<Image?> GetByStudentIdAsync(int studentId);
    }
}
