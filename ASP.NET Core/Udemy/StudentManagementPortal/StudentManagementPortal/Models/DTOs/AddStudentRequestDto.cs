using System.ComponentModel.DataAnnotations;
using System.Net;

namespace StudentManagementPortal.Models.DTOs
{
    public class AddStudentRequestDto
    {
        //[Required(AllowEmptyStrings = false, ErrorMessage = "Please enter name.")]
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Please enter valid email!")]
        [RegularExpression(@"^([A-Za-z0-9][^'!&\\#*$%^?<>()+=:;`~\[\]{}|/,₹€@ ][a-zA-z0-9-._][^!&\\#*$%^?<>()+=:;`~\[\]{}|/,₹€@ ]*\@[a-zA-Z0-9][^!&@\\#*$%^?<>()+=':;~`.\[\]{}|/,₹€ ]*\.[a-zA-Z]{2,6})$", ErrorMessage = "Valid Email Required!!!!!!!!!!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter password.")]
        [DataType(DataType.Password, ErrorMessage = "Please enter valid password.")]

        public string Password { get; set; }

        [Required(ErrorMessage = "Please enter valid enrollmentId.")]
        public int EnrollmentId { get; set; }

        public IFormFile File { get; set; }
        public string? ImageUrl { get; set; }
        public string? MobNumber { get; set; }



    }
}
