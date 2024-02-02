using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementPortal.Data;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Repositories.Interfaces;

namespace StudentManagementPortal.Repositories
{
    public class SQLStudentRepository : IStudentRepository
    {
        private readonly StudentPortalDbContext dbContext;

        public SQLStudentRepository(StudentPortalDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Student?> GetStudentByEnrollmentIdAsync(int enrollmentId)
        {
            var result = await dbContext.Students.FirstOrDefaultAsync(s => s.EnrollmentId == enrollmentId);
            var res2 = 5;
            return result;
        }
    }
}
