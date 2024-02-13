using Microsoft.AspNetCore.Mvc;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Repositories.Interfaces;
using StudentManagementPortal.Services.Interfaces;
using System.Net;

namespace StudentManagementPortal.Services
{
    public class ImageService : IImageService
    {
        private readonly IUnitOfWork unitOfWork;

        public ImageService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public async Task<Image?> GetByStudentIdAsync(int studentId)
        {
            var image = await unitOfWork.ImageRepository.GetByStudentIdAsync(studentId);
            if (image == null)
            {
                throw new BadHttpRequestException($"Image not found for {studentId} StudentId!!");
            }
            return image;

        }
    }
}
