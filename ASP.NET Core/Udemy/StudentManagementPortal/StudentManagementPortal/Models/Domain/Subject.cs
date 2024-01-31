namespace StudentManagementPortal.Models.Domain
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        ICollection<ResultSubject> ResultSubjects { get; set; }
    }
}
