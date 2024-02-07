using Microsoft.EntityFrameworkCore;
using StudentManagementPortal.Data;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Repositories.Interfaces;

namespace StudentManagementPortal.Repositories
{
    public class SQLResultRepository : IResultRepository
    {
        private readonly StudentPortalDbContext dbContext;

        public SQLResultRepository(StudentPortalDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Result> CreateAsync(Result resultDomainModel)
        {
            await dbContext.Results.AddAsync(resultDomainModel);
            await dbContext.SaveChangesAsync();
            return resultDomainModel;

        }

        public async Task<List<Result>> GetAllAsync()
        {
            return await dbContext.Results.Include(r => r.Student).Include(r => r.ResultSubjects).ToListAsync();
        }

        public async Task<Result?> GetByEnrollmentIdAsync(int enrollmentId)
        {
            var result = await dbContext.Results.Include(r => r.Student).Include(r => r.ResultSubjects).FirstOrDefaultAsync(r => r.Student.EnrollmentId == enrollmentId);
            if (result == null)
            {
                return null;
            }
            return result;
        }

        public async Task<Result?> GetByIdAsync(int id)
        {

            var result = await dbContext.Results.Include(r => r.Student).Include(r => r.ResultSubjects).FirstOrDefaultAsync(r => r.Id == id);
            if (result == null)
            {
                return null;
            }
            return result;
        }

        
    }
}
