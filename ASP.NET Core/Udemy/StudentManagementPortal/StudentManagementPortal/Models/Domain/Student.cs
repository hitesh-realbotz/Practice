using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace StudentManagementPortal.Models.Domain
{
    public class Student : User
    {
        //public Student( string imageUrl, string mobNumber, string name, string email, string hashPassword, string role, string status, int enrollmentId)
        //{
        //    EnrollmentId = (int)enrollmentId;
        //    ImageUrl = imageUrl;
        //    MobNumber = mobNumber;
        //    Name = name;
        //    Email = email;
        //    HashPassword = hashPassword;
        //    Role = role;
        //    Status = status;

        //}
        //public int Id { get; set; }
        public int EnrollmentId { get; set; }
        public string ImageUrl { get; set; }
        public string MobNumber { get; set; }

        public ICollection<Result> Results { get; set; }
        
    }
}
