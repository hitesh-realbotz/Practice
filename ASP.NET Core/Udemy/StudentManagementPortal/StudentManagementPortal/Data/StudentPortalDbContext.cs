using Microsoft.EntityFrameworkCore;
using StudentManagementPortal.Models.Domain;

namespace StudentManagementPortal.Data
{
    public class StudentPortalDbContext : DbContext
    {
        public StudentPortalDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<StudentResult> StudentResults { get; set; }
        public DbSet<ResultSubject> ResultSubjects { get; set; }
        public DbSet<LogInfo> LogInfos { get; set; }
 
    }
}
