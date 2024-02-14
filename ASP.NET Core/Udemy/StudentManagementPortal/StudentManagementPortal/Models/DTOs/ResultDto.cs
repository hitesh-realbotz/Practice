
namespace StudentManagementPortal.Models.DTOs
{
    public class ResultDto
    {
        public string Year { get; set; }
        public int TotalObtainedMarks { get; set; }
        public int TotalMarks { get; set; }
        public bool IsPass { get; set; }
        public int EnrollmentId { get; set; }

        public StudentProfileDto Student { get; set; }

        public List<SubjectDto> Subjects { get; set; }
    }
}
