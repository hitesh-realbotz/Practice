using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using StudentManagementPortal.Constants;
using StudentManagementPortal.Data;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories.Interfaces;

namespace StudentManagementPortal.Repositories
{
    public class SQLUserRepository : IUserRepository
    {
        private readonly StudentPortalDbContext dbContext;
        private readonly IConfiguration configuration;

        public SQLUserRepository(StudentPortalDbContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            this.configuration = configuration;
        }

        public async Task<User?> FindByEmailAsync(string email)
        {
            //var user = new User();
            //string query = @"Select * from [StudentPortalDb].[dbo].[Users] where Email = @Email";
            //string con = configuration["ConnectionStrings:StudentPortalConnection"];
            //using (SqlConnection connection = new SqlConnection(con))
            //{
            //    using (SqlCommand cmd = new SqlCommand(query, connection))
            //    {
            //        cmd.Parameters.AddWithValue("@Email", email);
            //        SqlDataReader reader = null;
            //        connection.Open();
            //        using (reader = cmd.ExecuteReader())
            //        {
            //            if (reader.HasRows)
            //            {
            //                while (reader.Read())
            //                {
            //                    user.Id = Convert.ToInt32(reader["Id"]);
            //                    user.Email = reader["Email"].ToString();
            //                    user.Name = reader["Name"].ToString();
            //                    user.Status = reader["Status"].ToString();
            //                    user.HashPassword = reader["HashPassword"].ToString();
            //                    user.Salt = reader["Salt"].ToString();
            //                    user.Role = reader["Role"].ToString();
            //                }
            //            }
            //        }
            //    }
            //}
            //return await Task.FromResult(user);

            return await dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        }


    }
}
