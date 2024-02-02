using StudentManagementPortal.Models.Domain;

namespace StudentManagementPortal.Repositories.Interfaces
{
    public interface IResultRepository
    {
        Task<Result> CreateAsync(Result resultDomainModel);
        Task<List<Result>> GetAllAsync();
        Task<Result?> GetByIdAsync(int id);
        Task<Result?> GetByEnrollmentIdAsync(int enrollmentId);
    }
}
