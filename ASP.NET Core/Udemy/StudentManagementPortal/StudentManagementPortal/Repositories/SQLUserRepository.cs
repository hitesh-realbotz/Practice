using Microsoft.EntityFrameworkCore;
using StudentManagementPortal.Data;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories.Interfaces;

namespace StudentManagementPortal.Repositories
{
    public class SQLUserRepository : IUserRepository
    {
        private readonly StudentPortalDbContext dbContext;

        public SQLUserRepository(StudentPortalDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<User> CreateAsync(User user)
        {
           
            await dbContext.AddAsync(user);
            await dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<User?> FindByEmailAsync(string email)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user;
        }

        //public async Task<User?> FindByStudentIdAsync(int studentId)
        //{
        //    var user = await dbContext.Users.Include("Student").FirstOrDefaultAsync(u => u.StudentId == studentId);
        //    return user;
        //}

        //public async Task<StudentProfileDto?> UpdateAsync(StudentProfileDto studentProfileDto)
        //{
        //    var user = await dbContext.Users.Include("Student").FirstOrDefaultAsync(u => u.Id == studentProfileDto.UserId);
        //    if (user == null)
        //    {
        //        return null;
        //    }
        //    user.Name = studentProfileDto.Name;
        //    user.Student.ImageUrl = studentProfileDto.ImageUrl;
        //    await dbContext.SaveChangesAsync();
        //    user = await dbContext.Users.Include("Student").FirstOrDefaultAsync(u => u.Id == studentProfileDto.UserId);
        //    var updatedStudentProfileDto = new StudentProfileDto()
        //    {
        //        EnrollmentId = user.Student.EnrollmentId,
        //        StudentId = user.Student.Id,
        //        ImageUrl = user.Student.ImageUrl,
        //        MobNumber = user.Student.MobNumber,
        //        UserId = user.Id,
        //        Name = user.Name,
        //        Email = user.Email,
        //        Password = null,
        //        Role = user.Role,
        //        Status = user.Status
        //    };

        //    return updatedStudentProfileDto;
        //}
    }
}
