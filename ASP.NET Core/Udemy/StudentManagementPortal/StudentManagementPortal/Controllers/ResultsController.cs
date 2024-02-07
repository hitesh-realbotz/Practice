using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories.Interfaces;
using System.Net;
using System.Security.Claims;

namespace StudentManagementPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IResultRepository resultRepository;
        private readonly IStudentRepository studentRepository;

        public ResultsController(IMapper mapper, IResultRepository resultRepository, IStudentRepository studentRepository)
        {
            this.mapper = mapper;
            this.resultRepository = resultRepository;
            this.studentRepository = studentRepository;
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] AddResultRequestDto addResultRequestDto)
        {

            var student = await studentRepository.GetStudentByEnrollmentIdAsync(addResultRequestDto.EnrollmentId);
            if (student == null)
            {
                return NotFound(new ApiErrorResponse(HttpStatusCode.NotFound, "Invalid EnrollmentId!!"));
            }

            var resultDomainModel = mapper.Map<Result>(addResultRequestDto);
            resultDomainModel.StudentId = student.Id;

            resultDomainModel = await resultRepository.CreateAsync(resultDomainModel);
            var resultDto = mapper.Map<ResultDto>(resultDomainModel);
            return Ok(resultDto);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var resultList = await resultRepository.GetAllAsync();
            var resultListDto = mapper.Map<List<ResultDto>>(resultList);
            return Ok(resultListDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var result = await resultRepository.GetByIdAsync(id);
            if (result != null)
            {
                return Ok(mapper.Map<ResultDto>(result));
            }
            return NotFound(new ApiErrorResponse(HttpStatusCode.NotFound, "Result not found!"));
            //return NotFound(new { Message = "Result with Id not found" });
        }

        [HttpGet]
        [Route("EnrollmentId/{enrollmentId:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetByEnrollmentId([FromRoute] int enrollmentId)
        {
            var result = await resultRepository.GetByEnrollmentIdAsync(enrollmentId);
            if (result != null)
            {
                return Ok(mapper.Map<ResultDto>(result));
            }
            return NotFound(new ApiErrorResponse(HttpStatusCode.NotFound, "Result not found!"));
        }


        [HttpGet]
        [Route("ByLoggedUser")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetByLoggedUser()
        {

            int enrollmentId = Convert.ToInt32(HttpContext.User.FindFirstValue(ClaimTypes.SerialNumber));

            var result = await resultRepository.GetByEnrollmentIdAsync(enrollmentId);
            if (result != null)
            {
                return Ok(mapper.Map<ResultDto>(result));
            }
            return NotFound(new ApiErrorResponse(HttpStatusCode.NotFound, "Result not found!"));
        }
    }
}
