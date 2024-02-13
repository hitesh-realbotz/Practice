using System.ComponentModel.DataAnnotations;

namespace StudentManagementPortal.Models.DTOs
{
    public class AddResultRequestDto
    {
        [Required]
        public string Year { get; set; }
        [Required]
        public int EnrollmentId { get; set; }

        public List<AddSubjectRequestDto> Subjects { get; set; }

        
    }
}
