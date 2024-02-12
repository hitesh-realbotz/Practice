namespace StudentManagementPortal.Constants
{
    public static class Const
    {
        public static class Role
        {
            public const string STUDENT = "Student";
            public const string ADMIN = "Admin";
        }

        public static class Status
        {
            public const string ACTIVE = "Active";
            public const string LOCKED = "Locked";
        }
        public static class LogType
        {
            public const string SIGNIN_AFTER_PASS_FAIL = "SignIn";
            public const string PASSWORDFAIL_1 = "SignIn Password Fail-1";
            public const string PASSWORDFAIL_2 = "SignIn Password Fail-2";
            public const string PASSWORDFAIL_3 = "SignIn Password Fail-3";
            public const string UPDATE = "Update Operation";
            public const string DELETE = "Delete Operation";
        }
     
        public static class ActionOn
        {
            public const string STUDENT_PROFILE = "Student";
            public const string STUDENT = "Student";
            public const string RESULT = "Asmin";
        }


    }
}
