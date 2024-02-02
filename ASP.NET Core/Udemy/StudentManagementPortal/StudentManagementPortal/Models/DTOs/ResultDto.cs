using StudentManagementPortal.Models.Domain;

namespace StudentManagementPortal.Models.DTOs
{
    public class ResultDto
    {
        public Guid Id { get; set; }
        public string Year { get; set; } //2023-2024
        public int StudentId { get; set; }

        public Student Student { get; set; }

        public List<ResultSubject> ResultSubjects { get; set; }
    }
}
