﻿using Microsoft.EntityFrameworkCore;
using StudentManagementPortal.Models.Domain;


namespace StudentManagementPortal.Data
{
    public class StudentPortalDbContext : DbContext
    {
        public StudentPortalDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<ResultSubject> ResultSubjects { get; set; }
        public DbSet<LogInfo> LogInfos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Result>()
                .HasOne(r => r.Student)
                .WithMany(s => s.Results)
                .HasForeignKey(r => r.StudentId);

            modelBuilder.Entity<Result>()
                .HasMany(r => r.ResultSubjects)
                .WithOne(rs => rs.Result)
                .HasForeignKey(rs => rs.ResultId);


            base.OnModelCreating(modelBuilder);
        }

    }
}
