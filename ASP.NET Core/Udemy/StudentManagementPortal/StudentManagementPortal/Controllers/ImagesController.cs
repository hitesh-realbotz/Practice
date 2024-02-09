using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories.Interfaces;
using System.Net;

namespace StudentManagementPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageRepository imageRepository;

        public ImagesController(IImageRepository imageRepository)
        {
            this.imageRepository = imageRepository;
        }
        [HttpGet]
        [Route("{studentId:int}")]
        public async Task<IActionResult> GetByStudentId([FromRoute] int studentId)
        {
            var image = await imageRepository.GetByStudentIdAsync(studentId);
            if (image == null)
            {
                return NotFound(new ApiErrorResponse(HttpStatusCode.NotFound, "Image Not Found!"));

            }
            var filecontentResult = new FileContentResult(image.Data, "application/octet-stream")
            {
                FileDownloadName = image.Name
            };

            return filecontentResult;                   //To return downloadable file
            //return File(image.Data, "image/jpeg");    //To return file content view
        }

    }
}
