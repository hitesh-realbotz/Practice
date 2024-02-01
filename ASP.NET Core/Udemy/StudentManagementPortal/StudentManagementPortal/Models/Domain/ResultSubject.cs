namespace StudentManagementPortal.Models.Domain
{
    public class ResultSubject
    {
        public int Id { get; set; }
        public int ResultId { get; set; }
        public int SubjectId { get; set; }
        public Result Result { get; set; }
        public Subject Subject { get; set; }

    }
}
