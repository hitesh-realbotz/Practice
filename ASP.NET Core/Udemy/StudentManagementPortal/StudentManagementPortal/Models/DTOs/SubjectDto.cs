using StudentManagementPortal.Models.Domain;

namespace StudentManagementPortal.Models.DTOs
{
    public class SubjectDto
    {
        public string Name { get; set; }
        public int ObtainedMarks { get; set; }
        public int TotalMarks { get; set; }
        public bool IsPass { get; set; }
        
    }
}
