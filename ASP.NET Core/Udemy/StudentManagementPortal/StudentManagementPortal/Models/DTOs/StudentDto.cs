using StudentManagementPortal.Models.Domain;

namespace StudentManagementPortal.Models.DTOs
{
    public class StudentDto
    {
        public int Id { get; set; }
        public int EnrollmentId { get; set; }
        public string ImageUrl { get; set; }
        public long MobNumber { get; set; }

        public List<Result> Results { get; set; }
    }
}
