namespace StudentManagementPortal.Models.Domain
{
    public class StudentResult
    {
        public int Id { get; set; }
        public string ResultStatus { get; set; } //Pass-Fail

        public int StudentId { get; set; }
        public int ResultId { get; set; }

        public Student Student { get; set; }
        public Result Result { get; set; }
    }
}
