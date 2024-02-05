using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentManagementPortal.Models.Domain;
using StudentManagementPortal.Models.DTOs;
using StudentManagementPortal.Repositories.Interfaces;

namespace StudentManagementPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IResultRepository resultRepository;

        public ResultsController(IMapper mapper, IResultRepository resultRepository)
        {
            this.mapper = mapper;
            this.resultRepository = resultRepository;
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddResultRequestDto addResultRequestDto)
        {
            var resultDomainModel = mapper.Map<Result>(addResultRequestDto);

            resultDomainModel = await resultRepository.CreateAsync(resultDomainModel);
            var resultDto = mapper.Map<ResultDto>(resultDomainModel);
            return Ok(resultDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var resultList = await resultRepository.GetAllAsync();
            var resultListDto = mapper.Map<List<ResultDto>>(resultList);
            return Ok(resultListDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var result = await resultRepository.GetByIdAsync(id);
            if (result != null)
            {
                return Ok(mapper.Map<ResultDto>(result));
            }
            return NotFound(new { Message = "Result with Id not found" });
        }

        [HttpGet]
        [Route("EnrollmentId/{enrollmentId:int}")]
        public async Task<IActionResult> GetByEnrollmentId([FromRoute] int enrollmentId)
        {
            var result = await resultRepository.GetByEnrollmentIdAsync(enrollmentId);
            if (result != null)
            {
                return Ok(mapper.Map<ResultDto>(result));
            }
            return NotFound(new { Message = "Result with Id not found" });
        }
    }
}
