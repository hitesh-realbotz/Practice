using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace StudentManagementPortal.Models.Domain
{
    public class Student
    {
        public int Id { get; set; }
        public int EnrollmentId { get; set; }
        public string ImageUrl { get; set; }
        public long MobNumber { get; set; }

        public ICollection<Result> Results { get; set; }
        
    }
}
