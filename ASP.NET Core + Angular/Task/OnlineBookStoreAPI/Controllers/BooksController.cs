using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Services.Interfaces;


namespace OnlineBookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookService bookService;

        public BooksController(IBookService bookService)
        {
            this.bookService = bookService;
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<BookDto>> AddPhoto([FromForm] List<IFormFile> files)
        {
            var bookDto = new List<BookDto?>();
            bookDto = await bookService.AddPhotoAsync(files);
            if (bookDto == null)
            {
                return BadRequest();
            }
            return Ok(bookDto);
        }
    }
}
