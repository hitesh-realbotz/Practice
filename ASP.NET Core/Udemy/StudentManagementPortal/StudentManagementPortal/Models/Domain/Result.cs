namespace StudentManagementPortal.Models.Domain
{
    public class Result
    {
        public int Id { get; set; }
        public string Year { get; set; } //2023-2024

        public int TotalObtainedMarks { get; set; }
        public int TotalMarks { get; set; }
        public bool IsPass { get; set; }

        //private int totalObtainedMarks;
        //public int TotalObtainedMarks
        //{
        //    get
        //    {
        //        return this.totalObtainedMarks;
        //    }
        //    set
        //    {
        //        this.totalObtainedMarks = ResultSubjects.Sum(rs => rs.ObtainedMarks);
        //    }
        //}

        //private int totalMarks;
        //public int TotalMarks
        //{
        //    get
        //    {
        //        return this.totalMarks;
        //    }
        //    set
        //    {
        //        this.totalMarks = ResultSubjects.Sum((rs) => rs.TotalMarks);
        //    }
        //}

        //private bool isPass;
        //public bool IsPass
        //{
        //    get
        //    {
        //        return this.isPass;
        //    }
        //    set
        //    {
        //        this.isPass = ResultSubjects.All(rs => rs.IsPass);
        //    }
        //}
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public ICollection<ResultSubject> ResultSubjects { get; set; }

    }
}
