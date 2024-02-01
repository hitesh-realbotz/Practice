namespace StudentManagementPortal.Models.Domain
{
    public class Result
    {
        public Guid Id { get; set; }
        public string Year { get; set; } //2023-2024

        ICollection<StudentResult> StudentResults { get; set; }
        ICollection<ResultSubject> ResultSubjects { get; set; }
    }
}
