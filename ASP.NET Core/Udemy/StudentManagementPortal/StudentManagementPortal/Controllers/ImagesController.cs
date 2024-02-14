using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentManagementPortal.Constants;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories.Interfaces;
using StudentManagementPortal.Services.Interfaces;
using System.Net;

namespace StudentManagementPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageService imageService;

        public ImagesController(IImageService imageService)
        {
            this.imageService = imageService;
        }
        [HttpGet]
        [Route("{studentId:int}")]
        public async Task<IActionResult> GetByStudentId([FromRoute] int studentId)
        {
            var image = await imageService.GetByStudentIdAsync(studentId);

            //var filecontentResult = new FileContentResult(image.Data, "application/octet-stream")
            //{
            //    FileDownloadName = image.Name
            //};
            //return filecontentResult;                   //To return downloadable file

            //return File(image.Data, "image/jpeg");    //To return file content view
            return File(image.Data, $"{Const.Content.IMAGE}/{Const.FilExtension.JPEG.Substring(1)}");    //To return file content view
        }

    }
}
