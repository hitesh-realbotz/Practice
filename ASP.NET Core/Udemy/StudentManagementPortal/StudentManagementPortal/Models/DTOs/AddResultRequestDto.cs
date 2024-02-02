using StudentManagementPortal.Models.Domain;

namespace StudentManagementPortal.Models.DTOs
{
    public class AddResultRequestDto
    {
        public string Year { get; set; } //2023-2024
        public int StudentId { get; set; }

        public List<AddSubjectRequestDto> ResultSubjects { get; set; }
    }
}
