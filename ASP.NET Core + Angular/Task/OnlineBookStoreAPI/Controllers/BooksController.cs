using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OnlineBookStoreAPI.Extensions;
using OnlineBookStoreAPI.Helpers;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookDto>>> GetBooks([FromQuery] BookParams bookParams)
        {
            var books = await bookService.GetBooksAsync(bookParams);

            Response.AddPaginationHeader(new PaginationHeader(books.CurrentPage, books.PageSize, books.TotalCount, books.TotalPages));
            return Ok(books);
        }

        [HttpGet("byTitle/{title}")]
        public async Task<ActionResult<BookDto>> GetBookByTitle(string title)
        {
            var book =  await bookService.GetBookByTitleAsync(title);
            //if(book == null) throw new BadHttpRequestException( $"Book with {title} title Not Found");
            if (book == null) return BadRequest();

            return Ok(book);    
        }


        [HttpGet("{isbn}")]
        public async Task<ActionResult<BookDto>> GetBook(string isbn)
        {
            var book =  await bookService.GetBookByISBNAsync(isbn);
            //if(book == null) throw new BadHttpRequestException( $"Book with {title} title Not Found");
            if (book == null) return BadRequest();

            return Ok(book);    
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
